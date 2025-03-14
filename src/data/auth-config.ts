// const AUTH_CONFIG_STRUCTURE: Record<string, ConfigItem> = {
//   verificationMethods: {
//     type: "group",
//     tooltip: "Available verification methods for both basic and 2FA accounts",
//     properties: {
//       email: {
//         type: "group",
//         tooltip: "Email verification settings",
//         properties: {
//           title: {
//             type: "property",
//             value: "Email",
//             valueType: "string",
//           },
//           description: {
//             type: "property",
//             value: "Receive a verification code via email",
//             valueType: "string",
//           },
//           type: {
//             type: "property",
//             value: "email",
//             valueType: "string",
//           },
//           enabled: {
//             type: "property",
//             value: true,
//             valueType: "boolean",
//           },
//         },
//       },
//       password: {
//         type: "group",
//         tooltip: "Password verification settings",
//         properties: {
//           title: {
//             type: "property",
//             value: "Password",
//             valueType: "string",
//           },
//           description: {
//             type: "property",
//             value: "Verify using your account password",
//             valueType: "string",
//           },
//           type: {
//             type: "property",
//             value: "password",
//             valueType: "string",
//           },
//           enabled: {
//             type: "property",
//             value: true,
//             valueType: "boolean",
//           },
//         },
//       },
//       twoFactor: {
//         type: "group",
//         tooltip: "Two-factor authentication methods",
//         properties: {
//           authenticator: {
//             type: "group",
//             tooltip: "Authenticator app settings",
//             properties: {
//               title: {
//                 type: "property",
//                 value: "Authenticator app",
//                 valueType: "string",
//               },
//               description: {
//                 type: "property",
//                 value: "Use your authenticator app to verify your identity",
//                 valueType: "string",
//               },
//               type: {
//                 type: "property",
//                 value: "authenticator",
//                 valueType: "string",
//               },
//               enabled: {
//                 type: "property",
//                 value: true,
//                 valueType: "boolean",
//               },
//             },
//           },
//           sms: {
//             type: "group",
//             tooltip: "SMS verification settings (requires Twilio setup)",
//             properties: {
//               title: {
//                 type: "property",
//                 value: "SMS",
//                 valueType: "string",
//               },
//               description: {
//                 type: "property",
//                 value: "Receive a verification code via SMS",
//                 valueType: "string",
//               },
//               type: {
//                 type: "property",
//                 value: "sms",
//                 valueType: "string",
//               },
//               enabled: {
//                 type: "property",
//                 value: false,
//                 valueType: "boolean",
//                 tooltip: "Disabled by default - enable if you've set up Twilio",
//               },
//             },
//           },
//           backupCodes: {
//             type: "group",
//             tooltip: "Backup codes settings",
//             properties: {
//               title: {
//                 type: "property",
//                 value: "Backup codes",
//                 valueType: "string",
//               },
//               description: {
//                 type: "property",
//                 value: "Use a backup code to verify your identity",
//                 valueType: "string",
//               },
//               type: {
//                 type: "property",
//                 value: "backup_codes",
//                 valueType: "string",
//               },
//               enabled: {
//                 type: "property",
//                 value: true,
//                 valueType: "boolean",
//               },
//             },
//           },
//         },
//       },
//     },
//   },
//   backupCodes: {
//     type: "group",
//     tooltip: "Backup codes generation settings",
//     properties: {
//       format: {
//         type: "property",
//         value: "words",
//         valueType: "string",
//         tooltip: "Format can be: words, alphanumeric, or numeric",
//       },
//       count: {
//         type: "property",
//         value: 10,
//         valueType: "number",
//         tooltip: "Number of backup codes to generate",
//       },
//       wordCount: {
//         type: "property",
//         value: 6,
//         valueType: "number",
//         tooltip: "Number of words per code (if using words format)",
//       },
//       alphanumericLength: {
//         type: "property",
//         value: 8,
//         valueType: "number",
//         tooltip: "Length of alphanumeric codes",
//       },
//     },
//   },
//   deviceSessions: {
//     type: "group",
//     tooltip: "Device session settings",
//     properties: {
//       maxAge: {
//         type: "property",
//         value: 365,
//         valueType: "number",
//         tooltip:
//           "Device sessions last for 1 year to match Supabase's refresh token expiration",
//       },
//     },
//   },
//   sensitiveActionGracePeriod: {
//     type: "property",
//     value: 5,
//     valueType: "number",
//     tooltip:
//       "Minutes before re-verification needed for sensitive actions (per device session)",
//   },
//   requireFreshVerification: {
//     type: "group",
//     tooltip: "Which operations need fresh verification",
//     properties: {
//       revokeDevices: {
//         type: "property",
//         value: false,
//         valueType: "boolean",
//       },
//       deleteAccount: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//       },
//     },
//   },
//   deviceVerification: {
//     type: "group",
//     tooltip: "Settings for unknown device verification",
//     properties: {
//       codeExpirationTime: {
//         type: "property",
//         value: 10,
//         valueType: "number",
//         tooltip: "Minutes until verification code expires",
//       },
//       codeLength: {
//         type: "property",
//         value: 6,
//         valueType: "number",
//       },
//     },
//   },
//   emailAlerts: {
//     type: "group",
//     tooltip: "Email alert settings for login attempts",
//     properties: {
//       enabled: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//         tooltip: "Master switch to enable/disable all login email alerts",
//       },
//       alertMode: {
//         type: "property",
//         value: "unknown_only",
//         valueType: "string",
//         tooltip:
//           "all = send for every login, unknown_only = only for new/unknown devices",
//       },
//       confidenceThreshold: {
//         type: "property",
//         value: 70,
//         valueType: "number",
//         tooltip:
//           "Only send alerts for devices with confidence score below this threshold when in unknown_only mode",
//       },
//     },
//   },
//   emailVerification: {
//     type: "group",
//     tooltip: "Email verification code settings",
//     properties: {
//       codeExpirationTime: {
//         type: "property",
//         value: 10,
//         valueType: "number",
//         tooltip: "Minutes until verification code expires",
//       },
//       codeLength: {
//         type: "property",
//         value: 6,
//         valueType: "number",
//       },
//     },
//   },
//   passwordReset: {
//     type: "group",
//     tooltip: "Password reset settings",
//     properties: {
//       requireReloginAfterReset: {
//         type: "property",
//         value: false,
//         valueType: "boolean",
//         tooltip:
//           "Whether users need to log in again after resetting their password",
//       },
//     },
//   },
//   api_rate_limit: {
//     type: "group",
//     tooltip: "API rate limiting settings",
//     properties: {
//       enabled: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//       },
//     },
//   },
//   passwordRequirements: {
//     type: "group",
//     tooltip: "Password strength and validation requirements",
//     properties: {
//       minLength: {
//         type: "property",
//         value: 8,
//         valueType: "number",
//         tooltip:
//           "Minimum password length (must match Supabase dashboard settings)",
//       },
//       maxLength: {
//         type: "property",
//         value: 72,
//         valueType: "number",
//       },
//       requireLowercase: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//       },
//       requireUppercase: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//       },
//       requireNumbers: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//       },
//       requireSymbols: {
//         type: "property",
//         value: true,
//         valueType: "boolean",
//       },
//     },
//   },
// } as const;
