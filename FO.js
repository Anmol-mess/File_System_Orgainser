// We will be creating a File System Organizer
// Features of the project
// if you have numerous Files in a folder and they are not properly arranged
// So you can use this tool to arrange them in specific directory according to their extensions
// at the end you will have an arranged set of files in specific folders

const helpModule = require('./commands/help')

const organizeModule = require('./commands/organize')

const treeModule = require('./commands/tree')

const fs = require("fs")

const path = require("path")



let input = process.argv.slice(2)
// process.argv is an array
let command = input[0]
// input can be Tree, organize, help

//  let types = {
//    media: ["mp4", "mkv", "mp3"],
//    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
//    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "ods", "odp", "odg", "odf", "txt", "ps", "tex",],
//    app: ["exe", "dmg", "pkg", "deb"],
//};

//Using switch

switch (command) {
    case 'tree':
        treeModule.treeKey(input[1])
        break
    case 'organize':
        organizeModule.organizeKey(input[1])
        break
    case 'help':
        helpModule.helpKey()
        break
    default:
        console.log('Please enter a valid command')
        break
}











