import dbConnect from '@/lib/dbConnect';
import Work from '@/models/Work';
import Worker from '@/models/Worker';

// accept work
export async function POST(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }

    await dbConnect();

    try {
        const { workerId, workId } = await req.json();
        console.log(workId, workerId);
        console.log("hi")
        // Check if the work exists
        const work = await Work.findById(workId); // Use workId directly
        console.log(work);
        if (!work) {
            return Response.json({ success: false, error: 'Work not found' });
        }
       
        // Check if the worker exists
        const worker = await Worker.findById(workerId);
        if (!worker) {
            return Response.json({ success: false, error: 'Worker not found' });
        }

        // Add worker to the acceptedWorkers array
        if (work.acceptedWorkers.includes(workerId)) {
            return Response.json({ success: false, error: 'Worker already accepted this work' });
        } else {
            work.totalWorkersRequired = work.totalWorkersRequired - 1;
        }

        work.acceptedWorkers.push(workerId);
        await work.save();

        // Add work to the worker's acceptedWorks array
        worker.acceptedWorks.push(workId);
        await worker.save();

        return Response.json({ success: true, data: work });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}

// get accepted works
export async function GET(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();

    try {
        const {searchParams} = new URL(req.url);
        const workerId = searchParams.get('workerId');

        // Check if the worker exists
        const worker = await Worker.findById(workerId).populate('acceptedWorks');
        if (!worker) {
            return Response.json({ success: false, error: 'Worker not found' });
        }

        const acceptedWorks = worker.acceptedWorks;

        return Response.json({ success: true, data: acceptedWorks });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}

// cancel the accepted work
export async function DELETE(req, res) {
    // const authResult = await auth(req);
    // if (authResult.status === 401) {
    //     return authResult; 
    // }
    await dbConnect();

    try {
        const {searchParams} = new URL(req.url);
        const id = searchParams.get('id');
        const { workerId } = await req.json();

        // Check if the work exists
        const work = await Work.findById(id);
        if (!work) {
            return Response.json({ success: false, error: 'Work not found' });
        }

        // Check if the worker exists
        const worker = await Worker.findById(workerId);
        if (!worker) {
            return Response.json({ success: false, error: 'Worker not found' });
        }

        // Remove worker from the acceptedWorkers array
        if (!work.acceptedWorkers.includes(workerId)) {
            return Response.json({ success: false, error: 'Worker did not accept this work' });
        }

        work.acceptedWorkers = work.acceptedWorkers.filter(w => w.toString() !== workerId);
        await work.save();

        // Remove work from the worker's acceptedWorks array
        worker.acceptedWorks = worker.acceptedWorks.filter(w => w.toString() !== id);
        await worker.save();

        return Response.json({ success: true, data: {} });
    } catch (error) {
        return Response.json({ success: false, error: error.message });
    }
}

