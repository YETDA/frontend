import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/MyTabs";

interface Tab {
  value: string;
  content: React.ReactNode;
}

export function TabBar({
  tabs,
  defaultValue = "소개글",
}: {
  tabs: Tab[];
  defaultValue: string;
}) {
  return (
    <Tabs
      defaultValue={defaultValue}
      className="bg-white rounded-3xl shadow-lg p-6 mb-8"
    >
      <TabsList className="flex space-x-2 overflow-x-auto">
        {tabs.map(({ value }) => (
          <TabsTrigger key={value} value={value}>
            {value}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(({ value, content }) => (
        <TabsContent key={value} value={value}>
          {content}
        </TabsContent>
      ))}
    </Tabs>
  );
}
