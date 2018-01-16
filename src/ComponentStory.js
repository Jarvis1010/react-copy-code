import { storiesOf, action } from '@kadira/storybook';
import Component from './Component';

storiesOf('Component', module).add('test one', () => (
    <Component title="Hellooo" />
));
