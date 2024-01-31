import { SequelizeStorage, Umzug } from "umzug";
import { join } from "path";
import { Sequelize } from "sequelize-typescript";

export const migrator = (
  sequelize: Sequelize
) => {
  return new Umzug({
    migrations: {
      glob: [
        "*/infrastructure/test-migrations/migrations*.{js,ts}",
        {
          cwd: join(__dirname, "../../.."),
          ignore: ["**/*.d.ts", "**/index.ts", "**/index.js"],
        },
      ],
    },
    context: sequelize,
    storage: new SequelizeStorage({ sequelize }),
    logger: console
  });
}