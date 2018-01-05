import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import { setOptions } from '@kadira/storybook-addon-options';

setOptions({
  name: 'Yoda Site Components',
  url: 'https://stash.jcpenney.com/projects/JCP-YODA/repos/yoda-site-components/browse',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: false,
  showSearchBox: false,
  downPanelInRight: false,
  sortStoriesByKind: true,
});
function loadStories() {
    require('../stories');
}

setAddon(infoAddon);
configure(loadStories, module);
