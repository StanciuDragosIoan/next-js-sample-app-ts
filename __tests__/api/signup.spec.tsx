import { testApiHandler } from "next-test-api-route-handler";
import type { NextApiRequest, NextApiResponse } from "next";
import handler from "@/pages/api/signup";

type Data = {
  msg: string;
};

it("returns 405 if hit with other method than POST", async () => {
  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({ method: "GET" });
      await expect(res.json()).resolves.toStrictEqual({
        msg: "Method Not Allowed, go away X__X!",
      });
    },
  });
});

// it("returns 201 if hit with other method than POST", async () => {
//   await testApiHandler({
//     handler,
//     test: async ({ fetch }) => {
//       const res = await fetch({
//         method: "POST",
//         body: JSON.stringify({
//           firstName: "test",
//           lastName: "test",
//           email: "test@test.com",
//           password: "test123",
//           salt: "123",
//           userType: "test",
//         }),
//       });

//       await expect(res.json()).resolves.toStrictEqual({
//         msg: "User Saved Successfully",
//       });
//     },
//   });
// });
