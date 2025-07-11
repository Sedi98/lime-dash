import { NextResponse, NextRequest } from "next/server";

const team = [
  {
    id: 1,
    name: "Seymur",
    surname: "Rzayev",
    position: "Scrum Master",
    position_id: 1,
    description: "Team facilitator and supporter",
    imageUrl: "/images/seymur.jpg",
  },
  {
    id: 2,
    name: "Sadi",
    surname: "Mammadov",
    position: "Frontend Developer",
    position_id: 2,
    description: "Team facilitator and supporter",
    imageUrl: "/images/sadi.jpg",
  },
  {
    id: 3,
    name: "Farmayil",
    surname: "Hasanov",
    position: "Frontend Developer",
    position_id: 2,
    description: "Team facilitator and supporter",
    imageUrl: "/images/fermayil.jpg",
  },
  {
    id: 4,
    name: "Nijat",
    surname: "Aghayev",
    position: "Backend Developer",
    position_id: 3,
    description: "Team facilitator and supporter",
    imageUrl: "/images/nijat.jpg",
  },
  {
    id: 5,
    name: "Nadir",
    surname: "Mammadov",
    position: "Backend Developer",
    position_id: 3,
    description: "Team facilitator and supporter",
    imageUrl: "/images/nadir.jpg",
  },
];


export async function GET(req: NextRequest) {
 const url = req.nextUrl;
 const searchParams = url.searchParams;
 const position_id = searchParams.get("position_id") || null;

  if (position_id) {
    const parsedPositionId = parseInt(position_id);
    const filteredTeam = team.filter((member) => member.position_id == parsedPositionId);
    return NextResponse.json({ team: filteredTeam, message: "Success", total: filteredTeam.length });
  } else {
    return NextResponse.json({team, message: "Success", total: team.length});
  }
}
