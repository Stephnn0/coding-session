import type { Discount } from "@prisma/client";


  export const createDiscount = async({ code }: Discount) => {
    return await prisma.discount.create({
        data: {
            id: '1',
            code: code
        } as Discount
    })
}

// export function getNote({
//     id,
//     userId,
//   }: Pick<Note, "id"> & {
//     userId: User["id"];
//   }) {
//     return prisma.note.findFirst({
//       select: { id: true, body: true, title: true },
//       where: { id, userId },
//     });
//   }
  
//   export function getNoteListItems({ userId }: { userId: User["id"] }) {
//     return prisma.note.findMany({
//       where: { userId },
//       select: { id: true, title: true },
//       orderBy: { updatedAt: "desc" },
//     });
//   }
// export function deleteNote({
//     id,
//     userId,
//   }: Pick<Note, "id"> & { userId: User["id"] }) {
//     return prisma.note.deleteMany({
//       where: { id, userId },
//     });
//   }