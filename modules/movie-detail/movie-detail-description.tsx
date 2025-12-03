import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieDetailDescriptionProps {
  description: string;
}

export default function MovieDetailDescription({
  description,
}: MovieDetailDescriptionProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="description" className="w-full">
        {/* Tabs */}
        <TabsList className="w-full justify-start">
          <TabsTrigger value="description">Tóm Tắt</TabsTrigger>
          <TabsTrigger value="reviews">Đánh Giá</TabsTrigger>
        </TabsList>

        {/* description */}
        <TabsContent value="description" className="mt-4">
          <p className="leading-relaxed">{description}</p>
        </TabsContent>


        {/* Reviews */}
        <TabsContent value="reviews" className="mt-4">
          Chưa có đánh giá nào.
        </TabsContent>
      </Tabs>
    </div>
  );
}
