const openVideoFromLocalPathExample = async () => {
  // Create a `Configuration` object.
  // Sources of the local audio clips.
  const audioSources = [
    require('../../assets/vesdk/newsong.mp3'),
    require('../../assets/vesdk/file_example.mp3'),
    require('../../assets/vesdk/file_example1.mp3'),
    // require("../../../../../assets/vesdk/far_from_home.mp3"),
  ];

  // The processed `AudioClip`s.
  var audioClips = [];

  // Convert the sources to valid `AudioClip`s.
  audioSources.forEach(source => {
    const uri = Image.resolveAssetSource(source).uri;
    const prefix = '/assets/vesdk/';

    // Generate the identifier based on the prefix.
    const identifier = uri.substring(
      uri.indexOf(prefix) + prefix.length,
      uri.indexOf('.mp3'),
    );

    const audioClip = {
      identifier: identifier,
      audioURI: uri,
    };
    audioClips.push(audioClip);
  });

  // Create a `Configuration` object.
  const configuration = {
    audio: {
      categories: [
        {
          identifier: 'elsewhere',
          name: 'Elsewhere',
          items: audioClips.slice(0, 3),
        },
        {
          identifier: 'other',
          name: 'Other',
          items: audioClips.slice(3),
        },
      ],
      // By default, the editor only allows the `CanvasAction.DELETE`.
      // For this example, the user should also be able to play and
      // pause the audio.
      canvasActions: [CanvasAction.DELETE, CanvasAction.PLAY_PAUSE],
    },
  };

  try {
    // Add a video from the assets directory.
    const video = require('../../assets/Video/production.mp4');

    // Open the video editor and handle the export as well as any occuring errors.
    //   const result = await VESDK.openEditor(video);
    // if (Platform.OS === 'ios') { await getPermissionIos() };
    // let pickerResult = await ImagePicker.openCamera({
    //     mediaType: 'video',
    // })
    // if (pickerResult.cancelled) {
    //     return;
    // }
    const result = await VESDK.openEditor(video, configuration);
    if (result != null) {
      // The user exported a new video successfully and the newly generated video is located at `result.video`.
      console.log('videdoready', result);
    } else {
      // The user tapped on the cancel button within the editor.
      console.log('ddsffs', result);
      return;
    }
  } catch (error) {
    // There was an error generating the video.
    console.log(error);
    // setRecoil(loadingState, true);
  }
};

const openVideoFromRemoteUrlExample = async () => {
  // Add a video from the assets directory.
  const video = require('../../assets/Video/production.mp4');

  // Open the video editor and handle the export as well as any occuring errors.
  //   const result = await VESDK.openEditor(video);
  // if (Platform.OS === 'ios') { await getPermissionIos() };
  // let pickerResult = await ImagePicker.openCamera({
  //     mediaType: 'video',
  // })
  // if (pickerResult.cancelled) {
  //     return;
  // }
  // Identifiers of the audio clips.
  const audioIdentifiers = [
    'elsewhere',
    'trapped_in_the_upside_down',
    'dance_harder',
    'far_from_home',
  ];

  // Download promises of remote assets.
  var promises = [];

  audioIdentifiers.forEach(identifier => {
    const remoteURL = `https://img.ly/static/example-assets/${identifier}.mp3`;
    const downloadPromise = RNFS.downloadAsync(
      remoteURL,
      RNFS.cacheDirectory + identifier + '.mp3',
    );
    promises.push(downloadPromise);
  });

  // Disable user interaction while the download is active. In production you would
  // want to show a progress indicator for example.
  setRecoil(interactionState, false);

  try {
    // Download the remote resources.
    const downloads = await Promise.all(promises);

    // The processed `AudioClip`s.
    var audioClips = [];

    // Process the downloaded audio clips.
    downloads.forEach((download, index) => {
      const uri = download.uri;
      const identifier = audioIdentifiers[index];

      const audioClip = {
        identifier: identifier,
        audioURI: uri,
      };

      audioClips.push(audioClip);
    });

    // Create a `Configuration` object.
    const configuration = {
      audio: {
        categories: [
          {
            identifier: 'elsewhere',
            name: 'Elsewhere',
            items: audioClips.slice(0, 2),
          },
          {
            identifier: 'other',
            name: 'Other',
            items: audioClips.slice(2),
          },
        ],
      },
    };

    // Open the video editor and handle the export as well as any occuring errors.
    const result = await VESDK.openEditor(video, configuration);

    if (result != null) {
      // The user exported a new video successfully and the newly generated video is located at `result.video`.
      console.log(result?.video);
    } else {
      // The user tapped on the cancel button within the editor.
      return;
    }
  } catch (error) {
    // There was an error generating the video.
    console.log(error);
  } finally {
    // Reenable user interaction. In production you would want to dismiss a
    // progress indicator for example.
    setRecoil(interactionState, true);
  }
};
