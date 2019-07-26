/** @jsx jsx */
import { jsx } from "@emotion/core";
import React from "react";
import { storiesOf } from "@storybook/react";
import { colors } from ".";
import * as typography from "./typography";
import { Table } from "./Table";
import { withKnobs, select } from "@storybook/addon-knobs/react";

interface User {
  name: string;
  email: string;
  image: string;
  dateAdded: string;
}

const users: User[] = [
  {
    name: "Alice Howell",
    email: "alice@starkindustries.net",
    image: require("./table.story/alice-howell.png"),
    dateAdded: "05/25/2019",
  },
  {
    name: "Benjamin Lawrence",
    email: "Ben@starkindustries.net",
    image: require("./table.story/benjamin-lawrence.png"),
    dateAdded: "05/25/2019",
  },
  {
    name: "Cynthia Bowman",
    email: "cbowman@starkindustries.net",
    image: require("./table.story/cynthia-bowman.png"),
    dateAdded: "05/25/2019",
  },
  {
    name: "Jeremy Jacobs",
    email: "jj@starkindustries.net",
    image: require("./table.story/jeremy-jacobs.png"),
    dateAdded: "05/25/2019",
  },
  {
    name: "Jeremy Griffin",
    email: "jgriffin@starkindustries.net",
    image: require("./table.story/jeremy-griffin.png"),
    dateAdded: "05/25/2019",
  },
];

storiesOf("Space Kit", module)
  .addDecorator(withKnobs)
  .add("Table", () => (
    <Table<User>
      keyOn="name"
      css={{ color: colors.black.base }}
      density={
        select("Density", ["standard", "condensed", "relaxed"], "standard") as
          | "standard"
          | "condensed"
          | "relaxed"
      }
      // data is an array of type user (defined as a generic)
      data={users}
      columns={[
        {
          id: 1,
          render: ({ image }) => (
            <img css={{ width: 32, height: 32 }} src={image} />
          ),
        },
        {
          id: 2,
          headerTitle: "description",
          render: ({ name, email }) => (
            <React.Fragment>
              <div>{name}</div>
              <div
                css={{
                  color: colors.grey.base,
                  ...typography.base.small,
                }}
              >
                {email}
              </div>
            </React.Fragment>
          ),
        },
        {
          id: 3,
          headerTitle: (
            <div
              css={{
                color: colors.blue.base,
              }}
              onClick={() => console.log("clicked")}
            >
              Date Added
            </div>
          ),
          render: ({ dateAdded }) => dateAdded,
        },
      ]}
    />
  ));
