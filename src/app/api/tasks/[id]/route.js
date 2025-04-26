import mysql from "mysql2/promise"
import { NextResponse, NextRequest } from 'next/server';
const db_cred = {
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER
}
export async function DELETE(req, context) {
    try {
        const { params } = await context;
        const { id } = params;
        const connection = await mysql.createConnection(db_cred);
        await connection.execute("DELETE FROM tasks WHERE id = ?", [id])
        await connection.end();
        return NextResponse.json({ "message": "Task deleted successfully." })
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, context) {
    try {
        const { params } = await context; 
        const { id } = params;
        
        const { name, description, priority } = await req.json();

        const connection = await mysql.createConnection(db_cred);
        await connection.execute(
            "UPDATE tasks SET name = ?, description = ?, priority = ? WHERE id = ?",
            [name, description, priority, id]
        );
        await connection.end();

        return NextResponse.json({ message: "Task updated successfully." });
    } catch (e) {
        console.error("Error updating task:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
