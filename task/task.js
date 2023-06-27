const router = require('express').Router();
let tasks = [];
let id = 0;
router.get('/',(req,res)=>{
        res.status(200).send({
                tasks
        });
});

const verifyMiddleware = function(req,res,next){
        console.log(req.body);
        if(req.body.hasOwnProperty("description") && req.body.hasOwnProperty("title") && req.body.hasOwnProperty("priority")){
                if(req.body.priority=='low' || req.body.priority=='medium' || req.body.priority=='high'){
                        req.body.priority = req.body.priority.toLowerCase();
                }
                else{
                        res.status(400).send(
                               'error: Invalid Argument Priority'
                        );
                        return;
                }
                next();
                return;
        }

        res.status(400).send(
                'error: Invalid Arguments'
        );
}
router.post('/',verifyMiddleware,(req,res)=>{

        tasks.push({
                priority: req.body.priority,
                title: req.body.title,
                description: req.body.description,
                creation: Date.now(),
                id: id
        });
        id = id + 1;
        res.status(200).send('task created with id '+(id-1));
})
/*
                update: req.query.update,
                retrieval: req.query.retrieval
*/
router.get('/:id',(req,res)=>{
        let taskIndex = tasks.findIndex((tsk)=>{
                return parseInt(tsk.id) === parseInt(req.params.id);
        });
        console.log(req.params);
        console.log(taskIndex)
        if(taskIndex === -1){
                res.status(400).send('This Id isnt available');
                return;
        }
        let task = tasks[taskIndex];
        task.retrieval = Date.now();
        tasks[id] = task;
        res.status(200).json(task);
});

router.put('/:id',(req,res)=>{
        let taskIndex = tasks.findIndex((tsk)=>{
                return parseInt(tsk.id) === parseInt(req.params.id);
        });
        if(taskIndex == -1){
                res.status(400).send('Invalid Id');
                return;
        }
        console.log(req.body);
        tasks[taskIndex].update = Date.now();
        if(req.body.hasOwnProperty('priority') && (req.body.priority.toLowerCase()==='low' || req.body.priority.toLowerCase()==='medium' || req.body.priority.toLowerCase()==='high')){
                tasks[taskIndex].priority = req.body.priority.toLowerCase();
        }
        else{
                res.status(400).send('Invalid Priority in the Req Body');
                return;
        }
        if(req.body.hasOwnProperty('title'))
                tasks[taskIndex].title = req.body.title;
        if(req.body.hasOwnProperty('description')){
                tasks[taskIndex].description = req.body.description;
        }
        res.status(200).json(
                tasks[taskIndex]
        );
});

router.delete('/:id',(req,res)=>{
        tasks = tasks.filter((task)=>{
                return task.id!=parseInt(req.params.id);
        });
        res.status(200).json(tasks);
});

module.exports = {router};