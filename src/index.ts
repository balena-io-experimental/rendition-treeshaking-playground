import { a as a1 } from 'big-module';
import { a as a2 } from 'big-module-with-flag';
import { Button } from 'rendition';
// import Button from 'rendition/dist_esm5/components/Button';
// import { Button as GrommetButton} from 'grommet';

// to be sure that the transpilation step worked
const tsTest: number = 5;

console.log(
	tsTest,
	a1,
	a2,
	Button,
	// GrommetButton,
);
