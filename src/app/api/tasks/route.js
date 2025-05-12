import { NextResponse} from 'next/server';
import db from "./db"
export async function GET() {
    try {
        const allTasks = await db.collection("tasks").get()
        const taskDocs = allTasks.docs.map((task) => ({
            id: task.id,
            ...task.data()
        }))    
        return NextResponse.json({ "data": taskDocs }, {status: 200})
    } catch (e) {
        return NextResponse.json({ "message": "SERVER ERROR: "+e }, {status: 500})
    }
}

export async function POST(req) {
    try {
        const payload = await req.json();
        await db.collection("tasks").doc().set(payload)
        return NextResponse.json({ "message": "Successfully created." }, {status: 200})
    } catch (e) {
        return NextResponse.json({ "message": "SERVER ERROR: "+e }, {status: 500})
    }
}



