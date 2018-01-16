import { configure } from '@kadira/storybook';

function loadStories() {
  require('../../src/ComponentStory.js');
}

configure(loadStories, module);
