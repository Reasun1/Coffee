import * as lucide from 'lucide-react';
const keys = Object.keys(lucide);
console.log('Icons with Icon suffix:', keys.filter(k => k.endsWith('Icon')).slice(0, 10));
console.log('Total icons:', keys.length);
