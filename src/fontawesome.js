// importing of font awesome libraries
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// importing free font awesome icons
import { faCopy } from '@fortawesome/free-solid-svg-icons';

// adding icons to the library
library.add(faCopy);

// exporting FontAwesomeIcon as global component
export { FontAwesomeIcon };