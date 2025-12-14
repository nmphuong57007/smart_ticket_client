import instance from "@/lib/instance";

export interface ShowtimeDetailRes {
  id: number;
  movie_id: number;
  room_id: number;
  show_date: string;
  show_time: string;
}

export const getShowtimeDetail = async (id: number): Promise<ShowtimeDetailRes> => {
  const res = await instance.get<{ success: boolean; data: ShowtimeDetailRes }>(
    `api/showtimes/${id}`
  );
  return res.data.data;
};
