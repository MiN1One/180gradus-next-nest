import { IStoreSettings } from "@shared/types/shop.types";

interface ColorsProviderProps {
  interfaceSettings: IStoreSettings;
}

export function ColorsProvider({ interfaceSettings }: ColorsProviderProps) {
  const variables = Object.keys(interfaceSettings).map(variable => 
    `--${variable}: ${interfaceSettings[variable]}`
  ).join(';');
  return (
    <style jsx global>
      {` :root { ${variables} } `}
    </style>
  );
}

export default ColorsProvider;