import { NextResponse} from 'next/server';
import db from "../db"
export async function DELETE(req, context) {
    try {
        const { params } = await context;
        const { id } = params;
        await db.collection("tasks").doc(id).delete()
        return NextResponse.json({ "message": "Task deleted successfully." },{status:200})
    } catch (e) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req, context) {
    try {
        const { params } = await context; 
        const { id } = params;      
        const data = await req.json();
        await db.collection("tasks").doc(id).update(data)
        return NextResponse.json({ message: "Task updated successfully." }, {status: 200});
    } catch (e) {
        console.error("Error updating task:", e);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
