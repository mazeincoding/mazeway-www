export default function Page() {
  // Reusable components with consistent styling
  const Title = ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-4xl font-bold tracking-tight">{children}</h1>
  );

  const Heading = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-3xl font-bold">{children}</h2>
  );

  const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold">{children}</h3>
  );

  // All paragraphs are muted by default
  const Paragraph = ({
    children,
    className = "",
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <p className={`text-muted-foreground ${className}`}>{children}</p>;

  const List = ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
      {children}
    </ul>
  );

  const SubList = ({ children }: { children: React.ReactNode }) => (
    <ul className="list-disc pl-6 space-y-1 text-muted-foreground">
      {children}
    </ul>
  );

  const Section = ({ children }: { children: React.ReactNode }) => (
    <section className="flex flex-col gap-4">{children}</section>
  );

  const FeatureSection = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-2">
      <SubHeading>{title}</SubHeading>
      <List>{children}</List>
    </div>
  );

  const TechBadge = ({ name }: { name: string }) => (
    <span className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
      {name}
    </span>
  );

  const Card = ({
    title,
    children,
  }: {
    title: string;
    children: React.ReactNode;
  }) => (
    <div className="flex flex-col gap-3 p-6 rounded-lg border bg-card text-card-foreground shadow-sm">
      <SubHeading>{title}</SubHeading>
      {children}
    </div>
  );

  return (
    <div className="flex flex-col gap-8 max-w-4xl">
      {/* Introduction Section */}
      <Section>
        <Title>Mazeway Auth</Title>
        <Paragraph className="text-xl">
          Authentication should live in your project, not a node_modules folder.
        </Paragraph>
        <Paragraph>Think Clerk, but you own the code.</Paragraph>
        <Paragraph>
          This is a complete, production-ready auth starter for anyone,
          including enterprise.
        </Paragraph>
      </Section>

      {/* Philosophy Section */}
      <Section>
        <Heading>Philosophy</Heading>
        <Paragraph>
          People like{" "}
          <a
            href="https://ui.shadcn.com"
            className="font-medium underline underline-offset-4 hover:text-primary"
          >
            Shadcn UI
          </a>{" "}
          because:
        </Paragraph>
        <List>
          <li>the components are in YOUR project</li>
          <li>you own them</li>
          <li>you can do whatever you want</li>
          <li>they don't belong in a node_modules folder</li>
        </List>

        <Paragraph>
          Comparing Shadcn UI to bootstrap is like comparing Mazeway to Clerk:
        </Paragraph>
      </Section>

      {/* Comparison Section */}
      <Section>
        <Heading>Comparison</Heading>

        <div className="flex flex-col gap-4">
          <SubHeading>Clerk</SubHeading>
          <List>
            <li>locked in</li>
            <li>gets expensive quick</li>
            <li>can't self host</li>
            <li>limited customization</li>
            <li>closed-source</li>
            <li>still lacks some auth (that you can't add)</li>
          </List>
        </div>

        <div className="flex flex-col gap-4">
          <SubHeading>Mazeway</SubHeading>
          <List>
            <li>affordable thanks to Supabase</li>
            <li>can be self-hosted</li>
            <li>unlimited customization</li>
            <li>open-source</li>
            <li>actual complete auth</li>
            <li>plus:</li>
            <SubList>
              <li>community-driven</li>
              <li>more secure</li>
              <li>auth config to change common things</li>
              <li>later: extensions by the community</li>
              <li>
                acts as a foundation, not a final product. Start here, build on
                it.
              </li>
            </SubList>
          </List>
        </div>
      </Section>

      {/* Tech Stack Section */}
      <Section>
        <Heading>Tech Stack</Heading>
        <Paragraph>The project uses modern tech:</Paragraph>
        <div className="flex flex-wrap gap-2">
          {[
            "Next.js 15",
            "Tailwind CSS",
            "Shadcn UI",
            "Supabase",
            "Resend",
            "Upstash Redis",
          ].map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>
        <Paragraph className="italic">
          (not all these are required to set up. Because this project is made
          for that - being minimal)
        </Paragraph>
      </Section>

      {/* Problem Statement Section */}
      <Section>
        <Heading>The Problem</Heading>
        <Paragraph>
          I see a lot of new apps having only 5% of authentication. Including:
        </Paragraph>
        <List>
          <li>Missing login page</li>
          <li>No "forgot password" option</li>
          <li>
            Missing crucial security (2FA, device sessions, email alerts, and
            more)
          </li>
          <li>Weird UI glitches with auth</li>
          <li>
            No way to connect account to multiple providers (or delete some)
          </li>
          <li>
            DDoS attacks for not having proper security and API rate limiting
          </li>
          <li>HUGE bills, for lack of security again</li>
          <li>This list is usually longer but you get the point</li>
        </List>
        <Paragraph>
          These are the kind of things that should be implemented by default.
        </Paragraph>
        <Paragraph>
          That's what this project gives you: a foundation that you can build
          on.
        </Paragraph>
      </Section>

      {/* Features Section */}
      <Section>
        <Heading>Features</Heading>
        <Paragraph>This starter pack includes:</Paragraph>

        <div className="flex flex-col gap-6">
          <FeatureSection title="Sign-in options:">
            <li>
              <code className="px-1.5 py-0.5 rounded bg-muted">
                Email/password
              </code>
            </li>
            <li>
              <code className="px-1.5 py-0.5 rounded bg-muted">Google</code>
            </li>
          </FeatureSection>

          <FeatureSection title="Complete authentication flow:">
            <li>Login/signup pages</li>
            <li>Password reset</li>
            <li>Device sessions tracking</li>
            <li>
              Two-factor authentication (2FA):
              <SubList>
                <li>Authenticator App</li>
                <li>SMS</li>
                <li>Backup codes</li>
              </SubList>
            </li>
          </FeatureSection>

          <FeatureSection title="Settings">
            <li>Basic profile management</li>
            <li>Change password</li>
            <li>
              Device session management
              <SubList>
                <li>View active sessions</li>
                <li>Revoke device access</li>
                <li>Email alerts for new logins</li>
              </SubList>
            </li>
            <li className="line-through">
              Account activity tracking (later)
              <SubList>
                <li className="line-through">
                  View activity history (logins, disable 2FA, etc)
                </li>
                <li className="line-through">
                  Get alerts for sensitive activity (unknown device login, etc)
                </li>
              </SubList>
            </li>
            <li>Enable and disable 2FA (including individual methods)</li>
          </FeatureSection>

          <FeatureSection title="Verification:">
            <li>2FA methods (Authenticator, SMS)</li>
            <li>
              Backup codes (for 2FA-accounts)
              <SubList>
                <li>Cryptographically secure</li>
                <li>
                  Supports multiple formats (words, alphanumeric, numeric)
                </li>
              </SubList>
            </li>
            <li>Password verification (no-2FA accounts with password)</li>
            <li>Email verification (no-2FA accounts)</li>
          </FeatureSection>

          <FeatureSection title="Additional Features:">
            <li>API rate limiting with Upstash Redis</li>
            <li>
              Bonus: a nice auth config in the project for devs to easily
              customize things (opens up more things than on this list)
            </li>
          </FeatureSection>
        </div>
      </Section>

      <div className="flex flex-col gap-2">
        <Paragraph className="text-lg">This is only the beginning.</Paragraph>
      </div>
    </div>
  );
}
