import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MovieDetailDescriptionProps {
  summary: string;
  cast: string[];
  directors: string[];
}

export default function MovieDetailDescription({
  summary,
  cast,
  directors,
}: MovieDetailDescriptionProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="summary" className="w-full">
        {/* Tabs */}
        <TabsList className="w-full justify-start">
          <TabsTrigger value="summary">Tóm Tắt</TabsTrigger>
          <TabsTrigger value="cast">Diễn Viên & Đạo Diễn</TabsTrigger>
          <TabsTrigger value="reviews">Đánh Giá</TabsTrigger>
        </TabsList>

        {/* Summary */}
        <TabsContent value="summary" className="mt-4">
          <p className="leading-relaxed">{summary}</p>
        </TabsContent>

        {/* Cast & Director */}
        <TabsContent value="cast" className="mt-4 space-y-4">
          <div>
            <h3 className="font-semibold">Diễn Viên</h3>
            <p>{cast.join(", ")}</p>
          </div>

          <div>
            <h3 className="font-semibold">Đạo Diễn</h3>
            <p>{directors.join(", ")}</p>
          </div>
        </TabsContent>

        {/* Reviews */}
        <TabsContent value="reviews" className="mt-4">
          Chưa có đánh giá nào.
        </TabsContent>
      </Tabs>
    </div>
  );
}
