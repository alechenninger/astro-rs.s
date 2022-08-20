import fs from 'fs';
import mm from 'music-metadata';

var episodes = [
  {
    title: 'Fresh Perspectives',
    description: 'Test'
  },
  // {
  //   title: 'The Quality Question',
  //   description: 'Test 2'
  // }
];

// todo: put all metadata in mp3?
// var mp3s = import.meta.glob('/public/episodes/*.mp3');

// note: rather than use git lfs and run up quota both there and on hosting
// provider, we could "just" use hosting provider for this metadata
// -- or -- just skip the mp3 bits if not found locally. means we couldn't
// put all of the metadata in the mp3s, though, but maybe that's fine.

await (async () => {
  for (var i = 0; i < episodes.length; i++) {
    var ep = episodes[i];
    var mp3 = `public/episodes/${i + 1}.mp3`;
    var stats = fs.statSync(mp3);
    var metadata = await mm.parseFile(mp3);
  
    ep.seconds = metadata.format.duration;
    ep.bytes = stats.size;
    ep.type = "audio/mpeg";
  }
})();

export default episodes;