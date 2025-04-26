import mysql from "mysql2/promise"
import { getParamKeys } from "next/dist/server/request/fallback-params";
import { NextResponse, NextRequest } from 'next/server';
const db_cred = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER
}

export async function GET() {
    try {
        const connection = await mysql.createConnection(db_cred);
        const [rows] = await connection.execute("SELECT * FROM tasks");
        return NextResponse.json({ "data": rows })
    } catch (e) {
        console.log(e)
    }
}

export async function POST(req) {
    try {
        const { name, description, priority } = await req.json()
        const connection = await mysql.createConnection(db_cred);
        await connection.execute("INSERT INTO tasks(name, description, priority) VALUES (?,?,?);", [name, description, priority])
        return NextResponse.json({ "message": "Successfully created." })
    } catch (e) {
        console.log(e)
    }
}



