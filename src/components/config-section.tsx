"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

// Add keyframes for gradient animation
const pulseKeyframes = `
@keyframes pulse {
  0%, 100% {
    opacity: 0.3;
  }
  50% {
    opacity: 0.7;
  }
}
`;

// Add style tag to head
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = pulseKeyframes;
  document.head.appendChild(style);
}

type ConfigValue = string | number | boolean;

interface ConfigGroup {
  type: "group";
  properties: Record<string, ConfigItem>;
}

interface ConfigProperty {
  type: "property";
  value: ConfigValue;
  valueType?: "string" | "number" | "boolean";
}

type ConfigItem = ConfigGroup | ConfigProperty;

function ConfigValue({ value, type }: { value: ConfigValue; type?: string }) {
  if (type === "string") {
    return <span className="text-green-500">"{value}"</span>;
  }
  return <span className="text-purple-500">{value.toString()}</span>;
}

function ConfigPropertyView({
  name,
  item,
}: {
  name: string;
  item: ConfigProperty;
}) {
  return (
    <span className="inline-block">
      <span className="text-orange-500">{name}</span>
    </span>
  );
}

function ConfigGroupView({
  name,
  item,
  isOpen,
  onToggle,
  path = "",
  isPathOpen,
  onPathToggle,
  indentLevel = 1,
}: {
  name: string;
  item: ConfigGroup;
  isOpen: boolean;
  onToggle: () => void;
  path?: string;
  isPathOpen?: (path: string) => boolean;
  onPathToggle?: (path: string) => void;
  indentLevel?: number;
}) {
  const currentPath = path ? `${path}.${name}` : name;
  const indent = "  ".repeat(indentLevel);

  return (
    <>
      <span
        className={`inline-block cursor-pointer hover:text-foreground transition-colors ${!isOpen ? "text-muted-foreground" : ""}`}
        onClick={onToggle}
      >
        <span className="flex items-center gap-1">
          <ChevronRight
            className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
          <span>{name}</span>
        </span>
      </span>
      :{" "}
      <span
        className="cursor-pointer hover:text-foreground transition-colors"
        onClick={onToggle}
      >
        {isOpen ? "{" : "{ ... }"}
      </span>
      {isOpen && (
        <>
          {"\n"}
          {Object.entries(item.properties).map(([propName, prop], i, arr) => (
            <span key={propName}>
              {indent}
              {"  "}
              {prop.type === "group" ? (
                <>
                  <ConfigGroupView
                    name={propName}
                    item={prop}
                    path={currentPath}
                    isOpen={isPathOpen?.(currentPath + "." + propName) || false}
                    onToggle={() =>
                      onPathToggle?.(currentPath + "." + propName)
                    }
                    isPathOpen={isPathOpen}
                    onPathToggle={onPathToggle}
                    indentLevel={indentLevel + 1}
                  />
                  {i < arr.length - 1 ? "," : ""}
                </>
              ) : (
                <>
                  <ConfigPropertyView name={propName} item={prop} />:{" "}
                  <ConfigValue value={prop.value} type={prop.valueType} />
                  {i < arr.length - 1 ? "," : ""}
                </>
              )}
              {"\n"}
            </span>
          ))}
          {indent}
          {"}"}
        </>
      )}
    </>
  );
}

export function ConfigSection() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    // Open the coolest sections by default
    emailAlerts: true,
    verificationMethods: true,
    "verificationMethods.twoFactor": true,
    backupCodes: true,
    "verificationMethods.twoFactor.backupCodes": true,
  });
  const [configData, setConfigData] = useState<Record<
    string,
    ConfigItem
  > | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        // Using GitHub's API to get the file content
        const response = await fetch(
          "https://api.github.com/repos/mazeincoding/Mazeway/contents/src/config/auth.ts"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch config");
        }

        const data = await response.json();
        const content = atob(data.content); // Decode base64 content

        // Extract the config object using a more reliable regex that handles TypeScript
        const configMatch = content.match(
          /export const AUTH_CONFIG = ({[\s\S]*?}) as const;/
        );
        if (!configMatch) {
          throw new Error("Could not find AUTH_CONFIG in the file");
        }

        // Clean up TypeScript-specific syntax
        const rawConfig = configMatch[1];
        console.log("Raw config:", rawConfig);

        const processedString = rawConfig
          // Remove comments
          .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, "")
          // Remove type assertions
          .replace(
            / as (?:TTwoFactorMethod|TVerificationMethod|"words" \| "alphanumeric" \| "numeric"|"all" \| "unknown_only"|const)/g,
            ""
          )
          // Add quotes to all object keys
          .replace(/(\b\w+)(?=\s*:)/g, '"$1"')
          // Fix any double-quoted numbers or booleans
          .replace(/"(true|false|\d+)"/g, "$1")
          // Remove trailing commas
          .replace(/,(\s*[}\]])/g, "$1")
          // Clean up any whitespace
          .trim();

        console.log("Processed config:", processedString);

        try {
          const parsedConfig = JSON.parse(processedString);
          console.log("Successfully parsed config:", parsedConfig);

          // Convert the flat config into our hierarchical structure
          const newConfig: Record<string, ConfigItem> = {};

          Object.entries(parsedConfig).forEach(([key, value]) => {
            if (typeof value === "object" && value !== null) {
              // It's a group
              newConfig[key] = {
                type: "group",
                properties: Object.entries(value).reduce(
                  (acc, [k, v]) => {
                    if (typeof v === "object" && v !== null) {
                      // Nested group
                      acc[k] = {
                        type: "group",
                        properties: Object.entries(v).reduce(
                          (innerAcc, [innerK, innerV]) => {
                            innerAcc[innerK] = {
                              type: "property",
                              value: innerV as ConfigValue,
                              valueType: typeof innerV as
                                | "string"
                                | "number"
                                | "boolean",
                            };
                            return innerAcc;
                          },
                          {} as Record<string, ConfigItem>
                        ),
                      };
                    } else {
                      // Property
                      acc[k] = {
                        type: "property",
                        value: v as ConfigValue,
                        valueType: typeof v as "string" | "number" | "boolean",
                      };
                    }
                    return acc;
                  },
                  {} as Record<string, ConfigItem>
                ),
              };
            } else {
              // It's a property
              newConfig[key] = {
                type: "property",
                value: value as ConfigValue,
                valueType: typeof value as "string" | "number" | "boolean",
              };
            }
          });

          setConfigData(newConfig);
        } catch (parseError) {
          console.error("Error parsing config:", parseError);
          throw new Error("Failed to parse configuration");
        }
      } catch (err) {
        console.error("Error fetching config:", err);
        setError(err instanceof Error ? err.message : "Failed to load config");
      }
    };

    fetchConfig();
  }, []);

  const toggleSection = (path: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const isOpen = (path: string) => openSections[path] || false;

  if (error) {
    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="destructive">Error</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Failed to Load Configuration
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">{error}</p>
        </div>
      </div>
    );
  }

  if (!configData) {
    const loadingConfig = {
      verificationMethods: {
        type: "group",
        properties: {
          twoFactor: {
            type: "group",
            properties: {
              enabled: {
                type: "property",
                value: true,
                valueType: "boolean",
              },
              methods: {
                type: "property",
                value: "all",
                valueType: "string",
              },
            },
          },
          passwordRules: {
            type: "group",
            properties: {
              minLength: {
                type: "property",
                value: 12,
                valueType: "number",
              },
              requireSpecial: {
                type: "property",
                value: true,
                valueType: "boolean",
              },
            },
          },
        },
      },
      emailAlerts: {
        type: "group",
        properties: {
          loginAttempts: {
            type: "property",
            value: true,
            valueType: "boolean",
          },
          newDevices: {
            type: "property",
            value: true,
            valueType: "boolean",
          },
        },
      },
      sessionTimeout: {
        type: "property",
        value: 3600,
        valueType: "number",
      },
    } as Record<string, ConfigItem>;

    return (
      <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">Configuration</Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Quick config, full code access
          </h2>
          <p className="text-muted-foreground max-w-2xl text-center">
            Adjust common settings through a simple config file. Need more? You
            own the code - customize the implementation however you want.
          </p>
        </div>

        <div className="flex flex-col gap-6 items-center">
          <div className="rounded-md overflow-hidden border bg-card shadow-sm max-w-3xl mx-auto w-full">
            {/* Mac window header */}
            <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                auth.ts
              </div>
            </div>

            {/* Loading preview with blur and gradient */}
            <div className="relative">
              <div className="blur-[2px] opacity-50">
                <pre className="p-4 text-sm overflow-x-auto hide-scrollbar">
                  <code>
                    <span className="text-blue-500">export const</span>{" "}
                    <span className="text-purple-500">AUTH_CONFIG</span> = {"{"}
                    {"\n"}
                    {Object.entries(loadingConfig).map(
                      ([key, item], i, arr) => (
                        <span key={key}>
                          {"  "}
                          {item.type === "group" ? (
                            <ConfigGroupView
                              name={key}
                              item={item}
                              path=""
                              isOpen={true}
                              onToggle={() => {}}
                              isPathOpen={() => true}
                              onPathToggle={() => {}}
                              indentLevel={1}
                            />
                          ) : (
                            <>
                              <ConfigPropertyView name={key} item={item} />:{" "}
                              <ConfigValue
                                value={item.value}
                                type={item.valueType}
                              />
                            </>
                          )}
                          {i < arr.length - 1 ? "," : ""}
                          {"\n"}
                        </span>
                      )
                    )}
                    {"}"} as const;
                  </code>
                </pre>
              </div>
              {/* Animated gradient overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(to bottom, rgba(0,0,0,0.25), transparent 30%, transparent 70%, rgba(0,0,0,0.25))",
                  animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                  opacity: 0.7,
                }}
              />
              {/* Loading indicator */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-background/95 px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Loading configuration...</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4 flex-shrink-0" />
            <span>Pro tip: Click any section to expand it</span>
          </div>
          <Link href="https://github.com/mazeincoding/mazeway/blob/main/src/config/auth.ts">
            <Button size="lg" variant="outline">
              View Full Configuration
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col items-center gap-4 text-center">
        <Badge variant="outline">Configuration</Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-balance">
          Quick config, full code access
        </h2>
        <p className="text-muted-foreground max-w-2xl text-center">
          Adjust common settings through a simple config file. Need more? You
          own the code - customize the implementation however you want.
        </p>
      </div>

      <div className="flex flex-col gap-6 items-center">
        <div className="rounded-md overflow-hidden border bg-card shadow-sm max-w-3xl mx-auto w-full">
          {/* Mac window header */}
          <div className="flex items-center justify-between px-4 py-2 bg-secondary border-b">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
            </div>
            <div className="text-xs text-muted-foreground font-medium">
              auth.ts
            </div>
          </div>

          {/* Code content with fade effect */}
          <div className="relative">
            <pre className="p-4 text-sm overflow-x-auto hide-scrollbar">
              <code>
                <span className="text-blue-500">export const</span>{" "}
                <span className="text-purple-500">AUTH_CONFIG</span> = {"{"}
                {"\n"}
                {Object.entries(configData).map(([key, item], i, arr) => (
                  <span key={key}>
                    {"  "}
                    {item.type === "group" ? (
                      <ConfigGroupView
                        name={key}
                        item={item}
                        path=""
                        isOpen={isOpen(key)}
                        onToggle={() => toggleSection(key)}
                        isPathOpen={isOpen}
                        onPathToggle={toggleSection}
                        indentLevel={1}
                      />
                    ) : (
                      <>
                        <ConfigPropertyView name={key} item={item} />:{" "}
                        <ConfigValue value={item.value} type={item.valueType} />
                      </>
                    )}
                    {i < arr.length - 1 ? "," : ""}
                    {"\n"}
                  </span>
                ))}
                {"}"} as const;
              </code>
            </pre>
            {/* Fade out effect */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-card to-transparent pointer-events-none" />
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4 flex-shrink-0" />
          <span>Pro tip: Click any section to expand it</span>
        </div>
        <Link href="https://github.com/mazeincoding/mazeway/blob/main/src/config/auth.ts">
          <Button size="lg" variant="outline">
            View Full Configuration
          </Button>
        </Link>
      </div>
    </div>
  );
}
