// import {useState, useEffect} from 'react';
// import classNames from 'classnames';

// function useWithClassAndHandler(item, clickHandler) {
//   const [className, setClassName] = useState();
//   useEffect(() => {
//     setClassName(classNames({
//       card: true,
//       item:true, 
//       'disabled': item.isSelected,
//       'added': item.isAdded,
//       'with-minutes': item.minutes && item.minutes.lst.length
//     }));
//   }, [item]);
//   function passHandler() {
//     clickHandler(item);
//   }
//   return {
//     className,
//     onClick: passHandler
//   };
// }

// export {useWithClassAndHandler};