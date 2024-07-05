import {
  Tabs as TabsShad,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "./ui/tabs";

type TabsProps = {
  defaultValue: string;
  contents: {
    value: string;
    content: React.ReactNode;
  }[];
};

export function Tabs({ defaultValue, contents }: TabsProps) {
  return (
    <TabsShad defaultValue={defaultValue.toLowerCase()}>
      <TabsList>
        {contents.map((content) => (
          <TabsTrigger
            key={content.value.toLowerCase()}
            value={content.value.toLowerCase()}
          >
            {content.value}
          </TabsTrigger>
        ))}
      </TabsList>
      {contents.map((content) => (
        <TabsContent
          key={content.value.toLowerCase()}
          value={content.value.toLowerCase()}
        >
          {content.content}
        </TabsContent>
      ))}
    </TabsShad>
  );
}
