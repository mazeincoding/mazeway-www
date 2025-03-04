"use client";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Info, ChevronRight } from "lucide-react";
import { useState } from "react";

type ConfigValue = string | number | boolean;

interface ConfigGroup {
  type: "group";
  tooltip: string;
  properties: Record<string, ConfigItem>;
}

interface ConfigProperty {
  type: "property";
  value: ConfigValue;
  tooltip?: string;
  valueType?: "string" | "number" | "boolean";
}

type ConfigItem = ConfigGroup | ConfigProperty;

const AUTH_CONFIG_STRUCTURE: Record<string, ConfigItem> = {
  verificationMethods: {
    type: "group",
    tooltip: "Available verification methods for both basic and 2FA accounts",
    properties: {
      email: {
        type: "group",
        tooltip: "Email verification settings",
        properties: {
          title: {
            type: "property",
            value: "Email",
            valueType: "string",
          },
          description: {
            type: "property",
            value: "Receive a verification code via email",
            valueType: "string",
          },
          type: {
            type: "property",
            value: "email",
            valueType: "string",
          },
          enabled: {
            type: "property",
            value: true,
            valueType: "boolean",
          },
        },
      },
      password: {
        type: "group",
        tooltip: "Password verification settings",
        properties: {
          title: {
            type: "property",
            value: "Password",
            valueType: "string",
          },
          description: {
            type: "property",
            value: "Verify using your account password",
            valueType: "string",
          },
          type: {
            type: "property",
            value: "password",
            valueType: "string",
          },
          enabled: {
            type: "property",
            value: true,
            valueType: "boolean",
          },
        },
      },
      twoFactor: {
        type: "group",
        tooltip: "Two-factor authentication methods",
        properties: {
          authenticator: {
            type: "group",
            tooltip: "Authenticator app settings",
            properties: {
              title: {
                type: "property",
                value: "Authenticator app",
                valueType: "string",
              },
              description: {
                type: "property",
                value: "Use your authenticator app to verify your identity",
                valueType: "string",
              },
              type: {
                type: "property",
                value: "authenticator",
                valueType: "string",
              },
              enabled: {
                type: "property",
                value: true,
                valueType: "boolean",
              },
            },
          },
          sms: {
            type: "group",
            tooltip: "SMS verification settings (requires Twilio setup)",
            properties: {
              title: {
                type: "property",
                value: "SMS",
                valueType: "string",
              },
              description: {
                type: "property",
                value: "Receive a verification code via SMS",
                valueType: "string",
              },
              type: {
                type: "property",
                value: "sms",
                valueType: "string",
              },
              enabled: {
                type: "property",
                value: false,
                valueType: "boolean",
                tooltip: "Disabled by default - enable if you've set up Twilio",
              },
            },
          },
          backupCodes: {
            type: "group",
            tooltip: "Backup codes settings",
            properties: {
              title: {
                type: "property",
                value: "Backup codes",
                valueType: "string",
              },
              description: {
                type: "property",
                value: "Use a backup code to verify your identity",
                valueType: "string",
              },
              type: {
                type: "property",
                value: "backup_codes",
                valueType: "string",
              },
              enabled: {
                type: "property",
                value: true,
                valueType: "boolean",
              },
            },
          },
        },
      },
    },
  },
  backupCodes: {
    type: "group",
    tooltip: "Backup codes generation settings",
    properties: {
      format: {
        type: "property",
        value: "words",
        valueType: "string",
        tooltip: "Format can be: words, alphanumeric, or numeric",
      },
      count: {
        type: "property",
        value: 10,
        valueType: "number",
        tooltip: "Number of backup codes to generate",
      },
      wordCount: {
        type: "property",
        value: 6,
        valueType: "number",
        tooltip: "Number of words per code (if using words format)",
      },
      alphanumericLength: {
        type: "property",
        value: 8,
        valueType: "number",
        tooltip: "Length of alphanumeric codes",
      },
    },
  },
  deviceSessions: {
    type: "group",
    tooltip: "Device session settings",
    properties: {
      maxAge: {
        type: "property",
        value: 365,
        valueType: "number",
        tooltip:
          "Device sessions last for 1 year to match Supabase's refresh token expiration",
      },
    },
  },
  sensitiveActionGracePeriod: {
    type: "property",
    value: 5,
    valueType: "number",
    tooltip:
      "Minutes before re-verification needed for sensitive actions (per device session)",
  },
  requireFreshVerification: {
    type: "group",
    tooltip: "Which operations need fresh verification",
    properties: {
      revokeDevices: {
        type: "property",
        value: false,
        valueType: "boolean",
      },
      deleteAccount: {
        type: "property",
        value: true,
        valueType: "boolean",
      },
    },
  },
  deviceVerification: {
    type: "group",
    tooltip: "Settings for unknown device verification",
    properties: {
      codeExpirationTime: {
        type: "property",
        value: 10,
        valueType: "number",
        tooltip: "Minutes until verification code expires",
      },
      codeLength: {
        type: "property",
        value: 6,
        valueType: "number",
      },
    },
  },
  emailAlerts: {
    type: "group",
    tooltip: "Email alert settings for login attempts",
    properties: {
      enabled: {
        type: "property",
        value: true,
        valueType: "boolean",
        tooltip: "Master switch to enable/disable all login email alerts",
      },
      alertMode: {
        type: "property",
        value: "unknown_only",
        valueType: "string",
        tooltip:
          "all = send for every login, unknown_only = only for new/unknown devices",
      },
      confidenceThreshold: {
        type: "property",
        value: 70,
        valueType: "number",
        tooltip:
          "Only send alerts for devices with confidence score below this threshold when in unknown_only mode",
      },
    },
  },
  emailVerification: {
    type: "group",
    tooltip: "Email verification code settings",
    properties: {
      codeExpirationTime: {
        type: "property",
        value: 10,
        valueType: "number",
        tooltip: "Minutes until verification code expires",
      },
      codeLength: {
        type: "property",
        value: 6,
        valueType: "number",
      },
    },
  },
  passwordReset: {
    type: "group",
    tooltip: "Password reset settings",
    properties: {
      requireReloginAfterReset: {
        type: "property",
        value: false,
        valueType: "boolean",
        tooltip:
          "Whether users need to log in again after resetting their password",
      },
    },
  },
  api_rate_limit: {
    type: "group",
    tooltip: "API rate limiting settings",
    properties: {
      enabled: {
        type: "property",
        value: true,
        valueType: "boolean",
      },
    },
  },
  passwordRequirements: {
    type: "group",
    tooltip: "Password strength and validation requirements",
    properties: {
      minLength: {
        type: "property",
        value: 8,
        valueType: "number",
        tooltip:
          "Minimum password length (must match Supabase dashboard settings)",
      },
      maxLength: {
        type: "property",
        value: 72,
        valueType: "number",
      },
      requireLowercase: {
        type: "property",
        value: true,
        valueType: "boolean",
      },
      requireUppercase: {
        type: "property",
        value: true,
        valueType: "boolean",
      },
      requireNumbers: {
        type: "property",
        value: true,
        valueType: "boolean",
      },
      requireSymbols: {
        type: "property",
        value: true,
        valueType: "boolean",
      },
    },
  },
} as const;

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
    <span className="group relative inline-block">
      <span className="text-orange-500">{name}</span>
      {item.tooltip && (
        <span className="invisible group-hover:visible absolute top-1/2 left-full ml-4 -translate-y-1/2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg whitespace-nowrap">
          {item.tooltip}
        </span>
      )}
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
        className={`group relative inline-block cursor-pointer hover:text-foreground transition-colors ${!isOpen ? "text-muted-foreground" : ""}`}
        onClick={onToggle}
      >
        <span className="flex items-center gap-1">
          <ChevronRight
            className={`h-3 w-3 transition-transform ${isOpen ? "rotate-90" : ""}`}
          />
          <span>{name}</span>
        </span>
        <span className="invisible group-hover:visible absolute top-1/2 left-full ml-4 -translate-y-1/2 px-3 py-2 bg-popover text-popover-foreground text-xs rounded-lg shadow-lg whitespace-nowrap">
          {item.tooltip}
        </span>
      </span>
      : {isOpen ? "{" : "{ ... }"}
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

  const toggleSection = (path: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const isOpen = (path: string) => openSections[path] || false;

  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col gap-12">
      <div className="flex flex-col items-center gap-4">
        <Badge variant="outline">Configuration</Badge>
        <h2 className="text-3xl md:text-4xl font-bold">
          Quick Config, Full Code Access
        </h2>
        <p className="text-muted-foreground max-w-2xl text-center">
          Adjust common settings through a simple config file. Need more? You
          own the code – customize the implementation however you want.
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
                {Object.entries(AUTH_CONFIG_STRUCTURE).map(
                  ([key, item], i, arr) => (
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
