// import instance from "@/lib/instance";
// import type { TicketPreviewResponse } from "../interfaces/ticket-preview-interface";

// export const getTicketPreview = async (
//   showtime_id: number,
//   seat_ids: number[],
//   combo_ids: number[]
// ) => {
//   const res = await instance.get<TicketPreviewResponse>("api/tickets/preview", {
//     params: {
//       showtime_id,
//       "seat_ids[]": seat_ids,
//       "combo_ids[]": combo_ids,
//     },
//   });

//   return res.data.data;
// };
