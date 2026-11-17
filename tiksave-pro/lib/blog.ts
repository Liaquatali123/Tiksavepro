export type BlogSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type BlogPost = { slug: string; title: string; description: string; category: string; readTime: string; published: string; intro: string[]; sections: BlogSection[]; takeaway: string };

export const posts: BlogPost[] = [
  {
    slug: 'simple-lighting-setups-for-short-form-video',
    title: 'Simple Lighting Setups for Short-Form Video That Looks Intentional',
    description: 'A practical guide to shaping flattering, repeatable light for vertical video with a window, one lamp, or a small creator kit.',
    category: 'Production', readTime: '7 min read', published: '2026-11-17',
    intro: [
      'Good lighting is not a shopping list. It is a way to control what the viewer notices first. A clean, repeatable setup can make a phone camera feel much more capable, whether you are recording a quick tutorial, a product demonstration, or a face-to-camera update. The goal is not to make every frame look like a commercial; it is to make the subject easy to see and the mood easy to understand.',
      'Start with the room you have. Notice the direction and color of existing light, then add only what solves a visible problem. A small change in placement often creates a bigger improvement than a new fixture.'
    ],
    sections: [
      { heading: 'Begin with a window and a simple subject-to-background gap', paragraphs: [
        'A large window is a soft source, especially when the sky is bright but not direct sun. Face it at an angle rather than placing it directly behind you. Turning your body roughly a quarter turn toward the window gives the face shape while keeping the shadow side readable. If the contrast feels harsh, move farther from the window or bounce some light back with a white wall, foam board, or a clean reflector.',
        'Give yourself distance from the background when the room allows it. Even one or two steps can help separate your outline and make the scene feel less cramped. Check the full vertical frame, not just the preview crop: a bright object, doorway, or stack of laundry may pull attention away from the subject. Small room adjustments usually cost nothing and remain consistent across takes.'
      ]},
      { heading: 'Shape a one-light setup instead of lighting everything', paragraphs: [
        'If daylight is inconsistent, use one soft LED or a lamp bounced into a pale wall. Put the source slightly above eye level and off to one side. A light that is too close can create a hot forehead and a bright patch on a wall; moving it back and increasing output usually makes the field more even. A diffuser softens edges, but it also reduces brightness, so leave enough output headroom.',
        'Let the opposite side of the face fall darker, then use a reflector only when details disappear. That controlled contrast looks more dimensional than adding a second lamp at the same brightness. Avoid placing a bare bulb in frame unless the visible bulb is a deliberate part of the set. The camera should expose for skin or the important object, not for the brightest practical light.'
      ]},
      { heading: 'Keep color temperature and white balance under control', paragraphs: [
        'Mixed color temperatures can make skin look blue on one side and orange on the other. Turn off room lamps that conflict with daylight, or choose a key light whose color is close to the ambient light. Set the phone camera’s white balance manually when the app allows it; otherwise, lock exposure and white balance after framing so they do not drift while you gesture.',
        'Do a short test recording and inspect it on a second screen if available. The room may look warm to your eyes while the camera renders it gray or green. Correct the source first rather than planning to fix every clip in editing. Stable input light makes matching cuts easier, especially if you record several pieces of a series on different days.'
      ]},
      { heading: 'Make vertical framing work with your light', paragraphs: [
        'The tall frame rewards a deliberate arrangement. Keep eyes near the upper third for a talking head, and leave room where captions or platform controls may cover the bottom. Place lamps outside the phone’s widest view, then walk through the gestures and props you will use. A hand can cast a sudden shadow across the face when it crosses a close light source.',
        'For product shots, rotate the product slowly and watch for reflections. Glossy packaging may mirror the window or phone as a bright rectangle. A sheet of tracing paper or a white shower curtain can enlarge the reflection, while a small black card adds edge definition. Keep anything near a hot lamp well away from the bulb and follow the manufacturer’s safety instructions.'
      ]},
      { heading: 'Use a repeatable setup for batches', paragraphs: [
        'When recording multiple clips, mark tripod and light positions with removable tape, note the camera height, and save a reference frame. Record a few seconds of room tone and a color reference before the first take. Those little production notes help recreate the look later, even if the room is rearranged or the camera app changes its settings.',
        'Batching does not require a complex studio. Choose one camera angle, keep the light direction fixed, and change only the object or script. If daylight shifts, pause and check your reference. A steady setup gives edits visual continuity and makes pickups less noticeable. For client or collaborative work, write down the fixture settings so another person can repeat the setup without guessing.'
      ]},
      { heading: 'A quick pre-recording lighting check', paragraphs: [
        'Before recording, clean the phone lens, confirm that the important side of the face is bright enough, and check for clipping on reflective objects. Watch the first five seconds back with sound on. Look for flicker, color changes, autofocus hunting, and shadows created by your normal movements. If a problem appears, change one variable at a time so you can tell what fixed it.',
        'Save a still of the finished setup alongside the project folder. A photo of the room, a short note about exposure, and the original camera file are more useful as a production record than trying to remember how you built the shot. Simple lighting is successful when it is comfortable, repeatable, and appropriate to the idea.'
      ]}
    ],
    takeaway: 'You do not need a studio to make clear vertical video. Start with a large soft source, control mixed colors, separate the subject from the background, and keep a reference so the next session is easier.'
  },
  {
    slug: 'clean-dialogue-audio-with-a-phone',
    title: 'How to Record Cleaner Dialogue Audio with the Phone You Already Own',
    description: 'Improve spoken-word recordings by choosing a quiet space, controlling distance, monitoring levels, and keeping editable source files.',
    category: 'Audio', readTime: '7 min read', published: '2026-11-17',
    intro: [
      'Viewers may tolerate a slightly soft image, but hard-to-understand speech makes a short video difficult to finish. Fortunately, clean dialogue is more about distance, room sound, and monitoring than expensive equipment. A recent phone can capture useful speech if it is placed thoughtfully and the room is not fighting the microphone.',
      'The simplest test is to record a short sample and listen through headphones. Do not judge the sound only from the phone speaker, which can hide low-level noise and make a muddy room seem clearer than it is.'
    ],
    sections: [
      { heading: 'Choose the quietest practical room', paragraphs: [
        'Listen before you set up. Air conditioning, refrigerators, traffic, computer fans, and hallway conversations often become obvious once a phone microphone is close to the speaker. Turn off what you safely can, silence notifications, and record when the building is calmer. A soft room with curtains, books, bedding, or a rug tends to sound less reflective than a bare kitchen or empty office.',
        'You do not need to cover every wall with foam. Begin by moving away from large hard surfaces and placing something soft nearby, such as a curtain or a folded blanket. A closet full of clothes can help in a pinch, but comfort matters: if the speaker feels cramped, delivery may suffer. The best recording space is quiet enough and natural enough that you can speak with a relaxed voice.'
      ]},
      { heading: 'Get the microphone close without putting it in the way', paragraphs: [
        'Phone microphones are small, so distance is a major factor. A phone positioned on a stand near chest height can produce a clearer voice than one sitting across a desk. If using a separate microphone, keep it roughly a hand span from the speaker and just outside the camera frame. Point it toward the mouth, but angle it slightly off-axis to reduce sharp breath sounds.',
        'Do not let a cable or stand touch the table if bumps will travel into the microphone. Put the phone on a stable surface, use airplane mode when practical, and avoid handling it during a take. Record a quick sample with the speaker at the same volume and distance planned for the actual shoot. Moving closer after recording begins changes tone and level, so mark the spot or use a consistent stand.'
      ]},
      { heading: 'Set levels and listen for problems early', paragraphs: [
        'If the recording app shows a meter, let normal speech peak with some headroom rather than touching the maximum. Clipped digital audio sounds harsh and cannot be fully repaired later. A low recording is safer than clipping, but turning it up also raises room noise. Keep a natural speaking distance, then make a short test at the loudest line you expect to deliver.',
        'Wear headphones and listen for hum, clothing rustle, plosives, echo, and sudden changes in loudness. Keep the phone away from necklaces, zippers, and loose fabric. If headphones are unavailable, record a short sample and listen in a quiet room before filming the whole script. A minute of monitoring can prevent a full reshoot.'
      ]},
      { heading: 'Speak for the edit', paragraphs: [
        'Pause briefly before and after each sentence. Those clean spaces give an editor room to cut without chopping off consonants, and they make noise reduction easier if it is needed. Deliver one thought per take when the script is dense. If a line goes wrong, pause, take a breath, and repeat the whole sentence rather than restarting mid-word.',
        'Keep a conversational pace and articulate the ends of words, especially when the video will play on a small speaker. Short sentences help viewers follow information without captions doing all the work. For a series, record a consistent opening and closing line in the same position. You can also capture a minute of room tone after the performance for editing reference.'
      ]},
      { heading: 'Edit conservatively and preserve the source', paragraphs: [
        'Noise reduction is useful when applied gently, but strong processing can create metallic or watery artifacts. Start with the smallest reduction that makes speech understandable. Use a high-pass filter only to remove rumble below the voice; a cutoff that is too high can thin a lower voice. Equalization should solve an audible issue, not imitate a preset you saw online.',
        'Normalize or compress only after the edit is clean. Compression can make quiet words more consistent, but it also raises breaths and background noise. Keep an untouched original recording and export a separate working copy. If you change tools later, a clean original gives you a fresh starting point instead of locking every decision into one processed file.'
      ]},
      { heading: 'Make a small repeatable audio checklist', paragraphs: [
        'Before a batch, check the room, phone position, mic direction, battery, free storage, and the first test recording. Note the input device and any app settings in your project folder. A second short test after moving the camera helps reveal whether the new framing placed a fan or window closer to the microphone.',
        'A reliable voice track does not have to be perfectly silent. It needs to be intelligible, consistent, and free of distractions that compete with the message. Keep the setup simple enough to repeat, save original recordings, and ask a listener who was not in the room whether every word is easy to understand.'
      ]}
    ],
    takeaway: 'For cleaner speech, record in a quiet soft room, move the microphone closer, monitor a test with headphones, and preserve an unprocessed original before editing.'
  },
  {
    slug: 'editing-pacing-and-captions-for-vertical-video',
    title: 'Editing Pacing and Captions for Vertical Video Without Making It Feel Rushed',
    description: 'Build an edit that is easy to follow: clarify the opening, use purposeful cuts, and treat captions as part of the composition.',
    category: 'Editing', readTime: '8 min read', published: '2026-11-17',
    intro: [
      'Short videos benefit from focus, not frantic cutting. Every edit should make the idea easier to understand, keep the viewer oriented, or create a purposeful change in energy. When every second contains a zoom, caption, sound effect, and jump cut, the important information can become harder to notice.',
      'A good first pass is often a clean sequence of complete thoughts. Once the structure works without decoration, add visual changes where they support the story rather than filling empty time.'
    ],
    sections: [
      { heading: 'Write the opening as a promise', paragraphs: [
        'The opening should tell a viewer what the clip is about and why the next few seconds are worth their attention. That promise can be a question, a result, a useful constraint, or a visual demonstration. Avoid an exaggerated hook that the rest of the video cannot deliver; a mismatch may earn a pause but it erodes trust.',
        'Begin as close as possible to the useful moment. Remove setup that does not add context, but do not cut so aggressively that the viewer cannot understand the situation. If a demonstration needs a before state, show it quickly and label it. A clear opening creates momentum because the audience knows what to watch for.'
      ]},
      { heading: 'Cut for meaning before cutting for speed', paragraphs: [
        'Build the first edit by removing repeated ideas, false starts, and long gaps. Keep natural pauses when they communicate thought or emotion. When a sentence is hard to follow, rearranging the words is not always the answer; recording a clearer line may be more honest and more efficient than stitching together fragments.',
        'Use a cut when the speaker changes thought, the demonstration advances, or a visual example provides evidence. A cut every few words can make a sincere explanation feel nervous. Try watching the edit with the screen turned away. If the sound alone feels coherent, the pacing likely has a strong foundation.'
      ]},
      { heading: 'Use captions for access and emphasis', paragraphs: [
        'Captions make speech more accessible to people watching without sound and to viewers who benefit from written reinforcement. Correct automatic transcription, punctuation, and speaker names before export. Keep line lengths readable and break captions at phrases rather than separating articles from nouns or prepositions from the words they introduce.',
        'Choose contrast that survives bright outdoor viewing. A subtle background or outline can improve legibility, but too many type treatments compete with the footage. Place captions where they do not cover faces, products, or platform controls. Check the composition on a phone-sized preview because the desktop timeline hides how little vertical space remains.'
      ]},
      { heading: 'Create visual variation with purpose', paragraphs: [
        'A change of angle, close-up, screen recording, or object detail can refresh attention while clarifying the explanation. Each insert should show something the narration refers to. If a cutaway is only decorative, it may interrupt rather than support the thought. Record a few extra details while you are already set up; they make useful visual bridges in the edit.',
        'Digital zooms and punch-ins can emphasize a word, but repeated movement quickly feels mechanical. Save motion for a shift in meaning or a reveal. Keep the subject inside a safe central area, leaving enough room for crops and captions. Before using a transition, ask whether a straightforward cut is clearer.'
      ]},
      { heading: 'Mix sound and picture as a single experience', paragraphs: [
        'Speech should remain easy to understand when music is present. Lower the music while dialogue plays, and listen on both headphones and a small speaker. A track that feels subtle on studio headphones can overwhelm a phone speaker. Choose sounds with an appropriate license and keep documentation of the permitted use with the project.',
        'Sound effects work best when they clarify an action or help mark a section. A click, whoosh, or impact on every cut turns into noise. Align important sound cues with the visible action, then leave some moments quiet. Intentional silence can be a useful contrast and gives the viewer a brief place to absorb a key point.'
      ]},
      { heading: 'Export, review, and save an editable archive', paragraphs: [
        'Watch the final export from beginning to end before posting or filing it. Check captions, spelling, levels, color shifts, accidental black frames, and anything hidden behind interface overlays. A phone preview is essential because vertical exports are consumed at small sizes and in changing environments.',
        'Save the final file separately from the editable project, and keep the original camera footage, audio, caption text, and licenses in a clear folder. Add a short note about the export resolution and date. If you later need to revise a claim or update a link, an organized project is far easier to repair than a single flattened video.'
      ]}
    ],
    takeaway: 'Start with a clear idea, edit for meaning, make captions readable on a phone, and use motion and sound only when they help the viewer understand.'
  },
  {
    slug: 'mobile-color-correction-for-consistent-video',
    title: 'Mobile Color Correction for Consistent, Natural-Looking Creator Videos',
    description: 'A practical order of operations for fixing exposure and white balance on mobile footage before adding a restrained creative look.',
    category: 'Editing', readTime: '7 min read', published: '2026-11-17',
    intro: [
      'Color correction is the work of making footage look balanced and consistent before styling it. It does not require a complicated grade or a shelf of presets. A few careful adjustments can help a mobile video feel intentional while preserving believable skin, product color, and detail.',
      'The most useful habit is to make technical corrections in a stable order and compare shots side by side. Treat a filter as a finishing choice, not a repair tool for footage with wildly shifting exposure or mixed light.'
    ],
    sections: [
      { heading: 'Prepare footage before touching sliders', paragraphs: [
        'Clean the lens and review the original clip on a screen with a comfortable brightness setting. If the screen is at maximum brightness, dark footage can appear brighter than it is. Turn off dramatic display color modes if possible, and avoid making final choices under a strongly colored room light.',
        'Group clips recorded in the same setup, then find the most representative shot. Correct it first and use it as a reference. If footage came from different phones, apps, or lighting conditions, expect each clip to need small individual adjustments. Applying one preset to every source can make mismatches worse rather than better.'
      ]},
      { heading: 'Correct exposure and contrast in a gentle order', paragraphs: [
        'Start with overall exposure. Bring the subject into a comfortable range while keeping highlights from clipping and shadows from collapsing into featureless black. If the app provides a histogram or waveform, use it as a guide, not a score. A face does not need to sit at a single numeric value to look natural.',
        'Adjust highlights and shadows next, using small moves. Pulling highlights down can recover bright details when they were captured, but no slider can restore data that is fully clipped. Opening shadows too far may reveal noise. Finish the basic contrast with restrained black and white points, then compare the result with the original before adding saturation.'
      ]},
      { heading: 'Set white balance before choosing a style', paragraphs: [
        'A white balance correction removes an unwanted overall cast. If a neutral wall or white object is in frame, compare it to what you remember seeing at the scene. A warm look can be intentional, but skin should not become orange simply because a preset pushes all colors in the same direction.',
        'Mixed sources are difficult to fix globally. Daylight from a window and a warm lamp may color opposite sides of the face. Correct what is most distracting, or simplify the light during recording next time. For a set of clips, match the neutral areas first and then compare skin, wardrobe, and product surfaces.'
      ]},
      { heading: 'Protect skin tones and meaningful product colors', paragraphs: [
        'A global saturation slider affects every color and can make lips, reds, and small highlights look unnatural. Increase color only when the image is truly dull, and check skin at normal size. The phone screen may render pinks and reds differently from a laptop, so look for a believable relationship between skin, clothing, and background instead of chasing one exact shade.',
        'For a product tutorial, accurate color may matter more than a dramatic mood. A colored lamp can make a neutral object look like a different version. If the item is the point, keep the key light neutral and reserve colored light for the background. Keep an untouched source file in case someone later needs an accurate product reference.'
      ]},
      { heading: 'Apply a restrained creative look', paragraphs: [
        'After the clips match, choose a visual direction that serves the story. Lower saturation slightly for a quiet interview, or add a subtle cool shadow and warm highlight for a cinematic mood. Make changes small enough that a viewer notices the subject and idea before noticing the grade.',
        'Look for banding in gradients, noisy shadows, and shifts that become obvious when the camera moves. A strong preset can hide texture and make several clips look like they came from different cameras. If using a LUT or filter, lower its intensity and review faces, neutral surfaces, and the beginning and end of each shot.'
      ]},
      { heading: 'Export a version you can revise later', paragraphs: [
        'Export at the intended vertical dimensions and a sensible bitrate for the footage. Avoid repeated recompression between editing apps. Keep an original project file and a high-quality master export in addition to any platform-ready copy. Use filenames that identify the cut or revision so no one mistakes a draft for the final.',
        'Review the export on the same kind of device your audience is likely to use. Check for unexpected color shifts, crushed dark detail, excessive brightness, and uneven shot matching. Leave a note about the app and major correction choices. Reproducibility matters: a modest, documented grade is easier to update than a mysterious stack of effects.'
      ]}
    ],
    takeaway: 'Correct exposure and white balance first, match neighboring shots, protect natural skin and product color, then add only as much style as the story needs.'
  },
  {
    slug: 'copyright-fair-use-and-short-form-video',
    title: 'Copyright, Fair Use, and Short-Form Video: A Practical Creator Checklist',
    description: 'Understand ownership, music licensing, permission, and why fair use is contextual before saving or reusing a short-form clip.',
    category: 'Rights & Safety', readTime: '9 min read', published: '2026-11-17',
    intro: [
      'A video being public does not mean it is free to copy, remix, repost, or monetize. A short post can contain several layers of rights: the footage, music, artwork, performances, trademarks, and a person’s likeness. A creator backup is useful for preserving your own work, but it does not transfer rights in someone else’s material.',
      'This guide is general information, not legal advice. Copyright rules vary by country, and exceptions such as fair use or fair dealing depend on the specific facts. When the use matters commercially or the stakes are high, get qualified legal advice.'
    ],
    sections: [
      { heading: 'Separate access from permission', paragraphs: [
        'A public URL only means that a post can be viewed under the platform’s current settings. It is not proof that the viewer has permission to make a copy or reuse the post. The person who posted a video may also not own every element in it. For example, a creator may have permission to use a song inside a platform but not to export that track for a brand campaign elsewhere.',
        'Before making a copy, identify what you are trying to preserve and why. If the video is your own original work, keep the raw footage and project files as well as any permitted platform export. If another person owns the work, ask for written permission that states the intended purpose, channels, duration, and whether editing or commercial use is allowed.'
      ]},
      { heading: 'Treat music as a separate rights question', paragraphs: [
        'Music rights can involve both a composition and a sound recording, and a platform’s music library may grant only limited in-platform uses. The terms can vary for personal accounts, commercial accounts, advertising, and different territories. A track being available in an app does not automatically clear it for a downloaded video, a client edit, or a repost on another service.',
        'For work outside the platform, use music with a license that covers the actual distribution and keep a copy of the license or receipt. Read limitations on paid advertising, client work, attribution, and duration. If the license is unclear, choose a track with plain-language terms or contact the rights holder instead of assuming that a short excerpt is automatically permitted.'
      ]},
      { heading: 'Understand why fair use is not a universal shortcut', paragraphs: [
        'In the United States, fair use is a fact-specific legal doctrine rather than a fixed number of seconds or a blanket permission for commentary. Courts weigh multiple factors, including purpose and character, the nature of the source work, the amount used, and market effect. Other countries may use different exceptions and terminology, including fair dealing.',
        'Adding a reaction, caption, or credit does not automatically make a use transformative or lawful. Credit can be courteous and may be required by a license, but attribution does not substitute for authorization. If a project relies on an exception, document why the excerpt is needed and seek legal review when the project is high-risk or commercial.'
      ]},
      { heading: 'Keep written permissions and source records', paragraphs: [
        'A practical release folder can include the source URL, the creator’s name, the permission message, the date, the intended use, and any license terms. Save the final approved version and a note about edits. For a collaboration, agree in advance on who may archive source footage, who can publish the finished work, and how a participant can request a correction or removal.',
        'Do not assume that a verbal okay covers every future format. A message that says “you can repost this clip” may not address paid ads, editing, sublicensing, or use in a portfolio. Ask a concise follow-up question before production if the scope matters. Clear permission is easier to obtain before a deadline than after a complaint.'
      ]},
      { heading: 'Respect privacy and platform rules', paragraphs: [
        'Copyright is not the only consideration. A video can reveal a private location, include a minor, or expose information that should not be redistributed. Public availability does not remove a person’s privacy interests or a platform’s rules. Avoid using tools to get around private-account settings, age gates, or technical restrictions.',
        'If a creator asks you to remove a copy, respond promptly and review any contractual or legal obligations that apply. Do not publicly repost a backup simply because you have it. A personal archive is most defensible when access is limited, the reason is legitimate, and the files are not used to impersonate, harass, or mislead anyone.'
      ]},
      { heading: 'Use a rights check before every reuse', paragraphs: [
        'Before publishing, ask who created the image and sound, what license or permission applies, whether the license covers the platform and audience, and whether the people shown agreed to the planned use. Keep evidence with the project. If any answer is unknown, pause and replace the material, request permission, or get advice rather than hoping a platform review will settle the issue.',
        'A simple written workflow also helps a team move quickly. Add a rights status field to the asset list, record any expiration date, and flag assets that cannot be used in ads. Review this information before each new cut, because a previously acceptable personal post may become a paid campaign with different requirements.'
      ]}
    ],
    takeaway: 'Public does not mean permission-free. Check each rights layer, document the scope of consent, treat fair use as fact-specific, and get legal advice for consequential uses.'
  },
  {
    slug: 'creator-backup-workflow-for-short-form-projects',
    title: 'A Creator Backup Workflow for Short-Form Projects That Is Easy to Maintain',
    description: 'Build a small, dependable project archive with consistent folders, verified copies, source notes, and a realistic backup rhythm.',
    category: 'Workflow', readTime: '8 min read', published: '2026-11-17',
    intro: [
      'A creator archive is only useful if you can find the right version and trust that it opens. The aim is not to preserve every temporary file forever. It is to keep the source footage, editable project, final export, and essential rights or production notes in a predictable place.',
      'A simple routine beats a perfect folder system that no one follows. Decide what matters for future edits, give each project a recognizable name, and verify that the backup is complete before clearing space from a phone or camera card.'
    ],
    sections: [
      { heading: 'Choose a project structure you can repeat', paragraphs: [
        'Use one top-level folder per project or recording batch, named with a date and a short subject. Inside it, keep separate folders for footage, audio, project files, exports, captions, and rights or reference notes. Avoid deeply nested paths that make mobile transfers hard. A predictable structure lets a collaborator understand the archive without a tour.',
        'If a project is part of a recurring series, keep the series name stable and include an episode or topic label in each project folder. Do not rely on “final-final-v3” as a version system. Use a clear status such as draft, review, or approved, then make the final export obvious. Keep working copies separate from the approved deliverable.'
      ]},
      { heading: 'Preserve the pieces an export cannot replace', paragraphs: [
        'A flattened video is convenient for viewing, but it cannot restore a missing source clip, a caption typo, or an edit decision. Keep original footage, separate recorded audio, the native editing project, any graphics or fonts that are licensed for use, and a final high-quality master. A copy downloaded from a platform may be recompressed or stripped of editable details.',
        'Save the caption text and important links outside the editing timeline. For licensed assets, retain a receipt or license page and note any expiry or channel limits. If someone else contributed footage or music, preserve the permission record with the project. These small records can prevent confusion when a video is reused months later.'
      ]},
      { heading: 'Use more than one copy and verify the transfer', paragraphs: [
        'A single device is a single point of failure. For valuable work, keep at least one additional copy on a separate storage device or reputable cloud account. A second drive stored beside the first may protect against a drive failure but not against theft, fire, or account access problems. Choose a backup arrangement that matches the sensitivity and value of the material.',
        'After transferring files, compare the number of files and open a few items from the destination. A progress bar reaching 100 percent does not always mean the transfer completed correctly. For long-term collections, file checksums can detect unexpected changes, but a basic playback test and a written inventory are a useful starting point for a small creator workflow.'
      ]},
      { heading: 'Create filenames that remain useful later', paragraphs: [
        'Use stable, human-readable names rather than relying on a platform identifier alone. A pattern such as date-topic-camera-take is easy to sort, while a short note can explain which clip contains the clean performance. Keep filenames reasonably short to avoid compatibility problems when moving between systems.',
        'Do not overwrite the only copy of an approved export when making a new edit. Save a revision with a clear version or date, and keep a small changelog when collaborators need to understand what changed. If a video is published, record the public URL and publication date in the project notes, not in the filename where it may become unwieldy.'
      ]},
      { heading: 'Plan a backup rhythm around real work', paragraphs: [
        'A useful habit is to copy the camera card after a shoot, check the destination, and keep the card unchanged until the backup is confirmed. At the end of an edit, save the project, export a master, and copy the completed folder to the second location. Put a short recurring reminder on the calendar for a monthly review of important active projects.',
        'If storage is limited, decide what can be safely removed only after checking whether it is reproducible. Temporary render caches may be recreated; original footage and unique audio cannot. Be cautious with automatic cleanup tools and cloud sync deletion behavior. A one-page rule for what to retain is easier to follow than a different judgment every time space runs low.'
      ]},
      { heading: 'Protect access and document the archive', paragraphs: [
        'Use unique account passwords and multi-factor authentication for cloud storage, and avoid sharing a public link to a folder containing unreleased work. Grant collaborators the minimum access needed, and remove old access when a project ends. If a device is lost, know which account sessions can be revoked and where the second copy lives.',
        'A tiny README can record the project title, creator, date, editor version, storage locations, and any rights notes. Keep it short enough to update. Periodically open a sample project and confirm that the required media is still available. An archive is not finished when it is copied; it is finished when another person—or future you—can locate and use it.'
      ]}
    ],
    takeaway: 'Keep originals and editable files, make a second verified copy, use readable names, and document the few details a future edit will need.'
  },
  {
    slug: 'audio-mastering-for-social-video',
    title: 'Audio Mastering for Social Video: A Practical Final-Pass Checklist',
    description: 'Balance speech, music, and effects for phone speakers with a consistent, careful final audio review before export.',
    category: 'Audio', readTime: '7 min read', published: '2026-11-17',
    intro: [
      'A final audio pass is not an attempt to make every video maximally loud. It is a check that speech is understandable, music supports rather than competes, and the export has no surprises. Short-form videos play in headphones, on phone speakers, and sometimes in noisy rooms, so translation matters more than impressive meters.',
      'Start with a clean edit and make decisions at a comfortable listening level. A stable, readable mix is more valuable than a complicated chain of processors.'
    ],
    sections: [
      { heading: 'Balance the story before using processing', paragraphs: [
        'Set the dialogue first. Bring the voice to a consistent level across cuts and check that every key word is understandable. Then introduce music quietly enough that it provides mood without masking consonants. Sound effects should sit behind the message unless a cue is itself the focus. Lowering competing tracks often solves more than adding compression to the whole mix.',
        'Use automation to reduce music under speech and allow it to rise during a visual break. A single fixed music level may feel fine in one section and overpower another. Keep the change smooth, and listen from the beginning so transitions do not call attention to themselves. Use separate tracks for voice, music, and effects so each can be revised independently.'
      ]},
      { heading: 'Check loudness and headroom responsibly', paragraphs: [
        'Leave headroom so the export does not clip when several tracks overlap. True-peak meters can help reveal peaks that occur between digital samples, but loudness targets vary by platform and workflow. Follow the delivery specification when one exists, and avoid chasing a universal number based on a social post or a single tool’s preset.',
        'Listen for distortion on the loudest word and at the most energetic musical moment. A meter can show a safe peak while a badly clipped source still sounds harsh. If a recording is already distorted, lowering it does not remove the distortion. Return to the original recording when possible, choose a cleaner take, or reduce the problem with a conservative repair rather than hiding it with more gain.'
      ]},
      { heading: 'Make dialogue clear on small speakers', paragraphs: [
        'Phone speakers reproduce only part of the low end, so an overly bass-heavy voice may sound muddy or disappear. A small reduction in low-frequency rumble and a modest presence adjustment can improve clarity, but broad boosts can make sibilance sharp. Use headphones to locate problems and a phone speaker to confirm that the words still read at normal volume.',
        'Check for stereo compatibility when the edit uses wide music or effects. Some listeners use a single speaker, and a phase issue can make important material quieter in mono. Keep dialogue centered unless the story demands otherwise. If the source is noisy, use gentle noise reduction, then compare with the unprocessed voice to make sure natural consonants and breaths remain.'
      ]},
      { heading: 'Choose music and sound effects with documentation', paragraphs: [
        'Use only audio you created, licensed, or are otherwise authorized to use in the planned context. A music clip available inside a platform may be covered by terms that do not travel with an exported file. Keep the license or permission details in the project folder, especially for client work, ads, and cross-platform publishing.',
        'Sound effects should clarify action, support a transition, or create a specific atmosphere. A constant stream of decorative effects can fatigue viewers and obscure speech. Use silence intentionally. A quiet beat before an important reveal can add more emphasis than another impact sound.'
      ]},
      { heading: 'Review the entire export, not just the timeline', paragraphs: [
        'Watch and listen to the exported file from beginning to end. Confirm the opening is not clipped, the last sound does not cut off abruptly, music is not left running under a blank frame, and no stray audio appears after the picture ends. Check the first and last second of every clip added late in the edit.',
        'Listen once on headphones and once through a phone speaker at a comfortable volume. If available, ask someone to listen without looking at the picture and repeat the main point. This is a simple test of dialogue intelligibility. If they miss a key phrase, adjust the mix or revise the delivery rather than assuming every viewer will use headphones.'
      ]},
      { heading: 'Keep a clean master and a clear revision trail', paragraphs: [
        'Save a high-quality master before making a platform-specific version. Keep a separate compressed export for upload and avoid recompressing the same file repeatedly. Record the sample rate, export settings, and version name when the project will be handed to another editor or revisited later.',
        'Preserve the original voice recording and a version of the mix before heavy processing. A future platform may change its playback behavior, or a client may request a clean dialogue stem. Naming files by project and revision helps prevent an old draft from being mistaken for the final. The best mastering process ends with a file that is easy to identify and verify.'
      ]}
    ],
    takeaway: 'Balance speech first, use headroom, listen on a phone as well as headphones, verify music rights, and review the exported file from start to finish.'
  },
  {
    slug: 'a-sustainable-short-form-creator-growth-workflow',
    title: 'A Sustainable Short-Form Creator Workflow for Learning and Growing',
    description: 'Build a repeatable planning, publishing, and review process that helps you learn from audience response without burning out.',
    category: 'Workflow', readTime: '8 min read', published: '2026-11-17',
    intro: [
      'A healthy creator workflow is a learning loop, not a promise of overnight growth. Planning, recording, editing, publishing, and reviewing can all become more manageable when each session has a clear purpose. The aim is to make work you are proud to repeat, then use audience response as one input for the next idea.',
      'Metrics can describe what happened, but they rarely explain everything by themselves. Pair numbers with a note about the creative choice you tested and what you would change next time.'
    ],
    sections: [
      { heading: 'Choose a manageable editorial promise', paragraphs: [
        'Start with a subject area and a viewer need you can return to regularly. The topic should be broad enough for many useful stories and specific enough that a viewer understands why your perspective matters. A simple editorial promise such as “one practical camera tip per week” gives you direction without forcing every post into the same format.',
        'List a handful of recurring questions from customers, students, collaborators, or your own process. Group related questions into themes and choose one that can be answered with a concrete example. This is often more sustainable than checking trends every day and building a calendar around topics that do not fit your expertise or goals.'
      ]},
      { heading: 'Plan a small batch with variation', paragraphs: [
        'A batch can be three ideas, not thirty. Give each piece one clear point, one example, and one action for the viewer. Use a simple outline rather than scripting every pause unless exact wording is important. A series can share a visual setup while changing the demonstration, question, or evidence in each episode.',
        'Leave room for timely work, but protect some planned projects from constant interruption. Put the topic, audience, source material, rights status, and expected next step in a lightweight tracker. A calendar should help you see what is possible, not shame you for missing an arbitrary daily target.'
      ]},
      { heading: 'Make production repeatable without becoming mechanical', paragraphs: [
        'A consistent camera, light, and audio setup reduces friction. Save a reference frame and a short note about the microphone and room. At the same time, keep room for visual variety when a demonstration needs a different angle. Reuse the setup when it helps the story, not just because repetition is easy.',
        'Record extra cutaways when they are relevant: a hand demonstrating a step, a close-up of a tool, or a view of the finished result. These details can make an explanation clearer and provide editing options. Keep raw files organized by date and idea so that a future installment can use the right material without searching through an unlabeled camera roll.'
      ]},
      { heading: 'Publish accessibly and responsibly', paragraphs: [
        'Correct captions, describe essential visual information in narration when possible, and check that text has sufficient contrast on a phone screen. Avoid placing important words under interface controls. If you use music, footage, or images from another creator, confirm that the license covers the intended channel and any commercial use.',
        'Write a caption that adds useful context rather than merely repeating the video word for word. A concise summary, relevant source, or clear question can help people continue the conversation. Set a boundary around responses: you do not need to answer every comment immediately, and you can remove harassment or protect your attention when a discussion becomes unhealthy.'
      ]},
      { heading: 'Review signals with a useful question', paragraphs: [
        'Choose one or two measures tied to the goal of a post. If the purpose is teaching, look at whether viewers stayed through the explanation or asked follow-up questions. If the purpose is discovery, compare reach and saves with other posts in the same format. Avoid treating one high or low result as a verdict on your ability.',
        'Record the question you were testing, such as whether a visual example made the opening clearer. Then note the result and one adjustment for the next piece. Platform metrics can be noisy and influenced by distribution patterns beyond your control. Pair them with qualitative feedback and your own assessment of accuracy, craft, and whether the video helped the intended audience.'
      ]},
      { heading: 'Protect the archive and your creative energy', paragraphs: [
        'Save the source files, editable project, final export, caption text, and rights notes in a predictable folder. Back up completed work to a second location and verify that the copy opens. The archive can protect time already invested and make a successful format easier to revisit without copying someone else’s work.',
        'Set a realistic publishing rhythm and a stopping point for revisions. A sustainable system includes time away from the feed, a plan for weeks when energy is low, and a way to say no to projects that do not fit. Consistency is valuable when it serves the work and the person doing it. A thoughtful pause is better than publishing something inaccurate just to maintain a streak.'
      ]}
    ],
    takeaway: 'Pick a sustainable editorial promise, plan small batches, evaluate one creative question at a time, and protect both your project files and your energy.'
  }
];

export function getPost(slug: string) { return posts.find(post => post.slug === slug); }
