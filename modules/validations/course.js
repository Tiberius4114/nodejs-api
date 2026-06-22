const { z } = require("zod");

module.exports = z.object({
  title: z.string().min(3),
  body: z.string().min(10),
  price: z.string(),
  image: z.url(),
});
