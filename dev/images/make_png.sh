#! /bin/bash

DIR="../../assets/images"

TODO="
class.aseprite
chair.aseprite
person.aseprite
table.aseprite
"

SCRIPT="
local sprite = app.sprite
local name = app.fs.fileTitle(sprite.filename)
local dir = \"$DIR\"

if #sprite.frames > 1 then
  app.command.ExportSpriteSheet{
    type = SpriteSheetType.HORIZONTAL,
    textureFilename = dir .. \"/\" .. name .. \".png\",
  }
  print(\"exported spritesheet: \" .. dir .. \"/\" .. name .. \".png\")
else
  sprite:saveCopyAs(dir .. \"/\" .. name .. \".png\")
  print(\"exported: \" .. dir .. \"/\" .. name .. \".png\")
end
"

for i in $TODO; do
    echo "processing" $i;
    echo $SCRIPT | aseprite -b --shell $i;
    echo "done";
done