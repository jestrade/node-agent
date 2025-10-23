import { faker } from "@faker-js/faker";

import UserService from "../services/user-service.js";

const userService = new UserService();

async function main() {
  const u = await userService.createUser(
    faker.internet.email(),
    faker.person.fullName()
  );

  console.log("Created user:", u);
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
