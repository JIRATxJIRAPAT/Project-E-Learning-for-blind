const Media = require("../model/Media");
const Course = require('../model/course');
exports.getAll = async (req, res) => {
  try {
    const media = await Media.find();

    res.json(media);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
// Backendurl/public/videos/file_name.mp4
exports.create = async (req, res) => {
  const { name } = req.body;
  let videosPaths = [];
  const id = req.params.id;

  if (Array.isArray(req.files.videos) && req.files.videos.length > 0) {
    for (let video of req.files.videos) {
      videosPaths.push("/" + video.path);
    }
  }

  try {
    const createdMedia = {
      name,
      videos: videosPaths,
    };
    Course.findById(req.params.id)
    .then(course => {
        //course.name = req.body.name;
        //course.img = req.file.originalname;
        //course.desc = req.body.desc;
        //course.episodes.name = req.body.episodeName;
        const num = course.chapters.length + 1
        
        newChap = {
        
          id: num,
          title: req.body.episodeName,
          video: videosPaths[0]
        }
        course.chapters.push(newChap)
        console.log(req.body.episodeName)
        course.save()
            
            
            

    })
    .catch((err)=> res.status(400).json(`Error: ${err}`))

    res.json({ message: "Media created successfully", createdMedia });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
