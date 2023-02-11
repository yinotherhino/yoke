import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Notes from "../components/Notes/Notes";
import { INote } from "../context/types";

const notes: INote[] = [
  {
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },{
    owner: "1234",
    text: "hello world, this is a wonderful day",
    links: [
      {
        start: 2,
        end: 5,
        url: "https://facebook.com",
      },
    ],
  },
];

const Dashboard = () => {
  return (
    <div>
      <Navbar isLoggedIn={true} />
      <Notes notes={notes} />
    </div>
  );
};

export default Dashboard;
