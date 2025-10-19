export const ORGANIZATION_NAMES = [
  { key: "algorand" as const, label: "Algorand" },
  { key: "algorandfoundation" as const, label: "Algorand Foundation" },
  { key: "perawallet" as const, label: "Pera wallet" },
] as const;

export type OrganizationKey = (typeof ORGANIZATION_NAMES)[number]["key"];
