const fs = require("fs")

const path = require("path")

let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex",],
    app: ["exe", "dmg", "pkg", "deb"],
};




function organizeFn(dirpath) {
    let destpath



    if (dirpath == undefined) {
        console.log("Please enter a valid Directory Path")
    } else {
        let doesExist = fs.existsSync(dirpath)
        //console.log(doesExist)
        //Code to create folder in the given directory
        // this will tell whether the dirpath exists or not
        if (doesExist) {
            destpath = path.join(dirpath, "organize_files")
            //D:\FJP-3\test Folder/organizes_files - I want tocreate a folder in this path


            if (fs.existsSync(destpath)) {
                console.log("Path Already exists")
            }
            else {
                fs.mkdirSync(destpath)// we will only create a folder if it doesnot exist already
            }

        }
        else {
            console.log('Please enter a valid path')
        }

    }
    organizeHelper(dirpath, destpath)
}

function organizeHelper(src, dest) {
    let childNames = fs.readdirSync(src)
    for (let i = 0; i < childNames.length; i++) {
        let childAddress = path.join(src, childNames[i])
        let isFile = fs.lstatSync(childAddress).isFile()// which type of file it is

        if (isFile == true) {
            let fileCategory = getCategory(childNames[i])
            console.log(childNames[i] + " belongs to " + fileCategory)

            sendFiles(childAddress, dest, fileCategory)
        }
    }
}

//function to take out the extension names of the files
function getCategory(name) {
    let ext = path.extname(name)
    ext = ext.slice(1)
    console.log(ext)


    for (let type in types) {
        let ctypeArr = types[type]

        for (let i = 0; i < ctypeArr.length; i++) {
            if (ext == ctypeArr[i])

                return type
        }
    }

    return 'others'
}

function sendFiles(srcFilePath, dest, fileCategory) {
    let catPath = path.join(dest, fileCategory)

    if (fs.existsSync(catPath) == false) {//CHECKING FOR CATEGORY FOLDER PATH
        fs.mkdirSync(catPath)
    }

    let fileName = path.basename(srcFilePath) // WE TOOK OUT THE NAME OF THE FILES
    let destFilePath = path.join(catPath, fileName)// here we created a path for the files in category folders

    fs.copyFileSync(srcFilePath, destFilePath)// copied files from src to dest

    fs.unlinkSync(srcFilePath)// delete the files from src

    //console.log(fileName + "is copied to" + fileCategory)   

}



module.exports ={
    organizeKey : organizeFn
}