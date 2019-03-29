import React, { useState, useEffect, Fragment } from 'react';
import { Transition } from 'react-transition-group';
import {withRouter} from  'react-router-dom';
import classNames from 'classnames';
import ReactPhoneInput from 'react-phone-input-2';
import { getState } from '../../state';
import { submitUserSelectedItem } from '../../api';
import SubmitButton from '../Submit';
import NoDataAvailable from './NoData';

function DefaultPage({date, match}) {
  const [{timelist}] = getState();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [choosenDate, setChoosenDate] = useState(!!window.localStorage.getItem(date));
  // cDM, cDU
  useEffect(() => {
   setChoosenDate(!!window.localStorage.getItem(date));
  }, [date]);

  let userInfo = false;
  let selectedItem = false;

  function handleForm(user) {
    userInfo = user;
  }
  function setSelectedItem(item) {
    selectedItem = item;
  }
  function submitHandler() {
    if (selectedItem && userInfo) {
      setIsSubmiting(true);
      const {name, surname, phone} = userInfo;
      submitUserSelectedItem({data: selectedItem,date: date, name, surname, phone, 
        isFraction: match.url === '/mm' ? true : false })
        .then(() => {
          window.localStorage.setItem(date, true);
          setChoosenDate(true);
        })
        .finally(() => setIsSubmiting(false));
    }
  }
  console.log('PickupHolder render');

  if (!timelist.length) return <NoDataAvailable header="Нет доступного времени" body="Извините, мы не смогли найти свободного времени на выбранную дату." />
  if (choosenDate) return <NoDataAvailable header="Дата выбрана." body="Вы уже выбрали время для текущего дня." />
  return (
    <div className="ui container">
      <FormHolder onValidForm={handleForm} />
      {match.url === '/' && <ListItems timelist={timelist} onItemSelect={setSelectedItem} />}
      {match.url === '/mm' && <ListItemsWithMinutes timelist={timelist} onItemSelect={setSelectedItem} />}
      <SubmitButton label="Отправить" onSubmit={submitHandler} isLoading={isSubmiting} />
    </div>
  );
}
export default withRouter(DefaultPage);

const ListItems = ({timelist, onItemSelect}) => {
  const [list, setList] = useState(timelist);
  useEffect(() => {
    setList(timelist.filter((el) => el.isSelected === false && (el.minutes && el.minutes.lst.length === 0)));
  }, [timelist]); 
  function handlerClick(item) {
    setList(
      list.map((el) => {
        if (el === item) {
          const nextItem = {...el, isAdded: !el.isAdded};
          onItemSelect(nextItem.isAdded ? nextItem : false);
          return nextItem;
        }  else {
          return {...el, isDisabled: !el.isDisabled}
        } 
      })
    )
  }
  return (
    <div className="ui cards">
      {list.map((item) => 
        <PickItemSelector 
          key={item._id}
          item={item}
          handlerClick={handlerClick}
        />
      )}
    </div>
  );
}
const ListItemsWithMinutes = ({timelist, onItemSelect}) => {
  const [list, setList] = useState([]);
  const [minuteList, setMinuteList] = useState([]);
  const [currSelectedHour, setCurrSelectedHour] = useState(false);

  console.log(timelist);
  console.log(list);
  function filterTimelist() {
    return timelist
      .filter((el) => el.isSelected === false && (el.minutes && el.minutes.lst.length > 0))
      .map(el => ({...el, minutes: {...el.minutes, lst: el.minutes.lst.filter(minItem => minItem.isSelected === false)}}))
    
      //.filter(el => el.minutes.lst.filter(minuteItem => minuteItem.isSelected === false));
  }
  useEffect(() => {
    setList(filterTimelist);
  }, [timelist]); 

  function handlerClick(item) {
    setList(
      list.map((el) => {
        if (el === item) {
          const nextItem = {...el, isAdded: !el.isAdded};
          setCurrSelectedHour(nextItem.isAdded ? nextItem : false);
          setMinuteList(nextItem.isAdded ? nextItem.minutes.lst : []);
          // props.onItemSelect(nextItem.isAdded ? nextItem : false);
          return nextItem;
        }  else {
          return {...el, isDisabled: !el.isDisabled}
        } 
      })
    )
  }
  function handlerClickMinuteItem(item) {
    console.log(item);
    setMinuteList(
      minuteList.map(el => {
        if (el === item) {
          console.log(currSelectedHour);
          const nextItem = {...el, isAdded: !el.isAdded, isSelected: !el.isAdded};
          const nextCurrSelectedHours = {...currSelectedHour,
            minutes: {...currSelectedHour.minutes, 
              lst: [...currSelectedHour.minutes.lst.filter(el => el.time !== item.time), nextItem]
            }
          };
          setCurrSelectedHour(nextCurrSelectedHours);
          onItemSelect(nextItem.isAdded ? nextCurrSelectedHours : false)
          return nextItem;
        }  else {
          return {...el, isDisabled: !el.isDisabled}
        } 
      })
    )
  }
  return (
    <Fragment>
    <div className="ui cards">
      {list.map((item) => 
        <PickItemSelector
          key={item._id}
          item={item}
          handlerClick={handlerClick}
        />
      )}
    </div>
    <Transition timeout={4000} in={!!minuteList.length} appear unmountOnExit>
    {(status) => {
      {console.log(status)}
      return <div className={`ui cards transition-${status}`}>
      {
        minuteList.map((item) => {
          return <PickItemSelector
            key={item.time}
            item={item}
            handlerClick={handlerClickMinuteItem}
          />
      })
      }
    </div>
    }}
    
    </Transition>
    </Fragment>
  );
}
function PickItemSelector(props) {
  const cssClassList = classNames({
    card: true,
    item:true, 
    'item-added': props.item.isAdded,
    'item-disabled-blur': props.item.isDisabled,
    'item-withminutes': props.item.minutes && props.item.minutes.lst.length > 0
  });
  return PickItem({...props, cssClassList});
}
function PickItem({item, handlerClick, cssClassList}) {
  function selfClickHandler() {
    handlerClick(item);
  }
  console.log('pick item render');
  return (
    <div className={cssClassList} onClick={selfClickHandler}>
      <div className="content">
        <div className="header">
          {item.time}            
        </div>
      </div>
    </div>
  )
}

function FormHolder({onValidForm}) {
  const name = useFormInput();
  const surname = useFormInput();
  const [phone, setPhone] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  
  useEffect(() => {
    if (name.isValid && surname.isValid && phone.length > 8) {
      isFormValid === false && setIsFormValid(true)
    } else { isFormValid===true && setIsFormValid(false) } 
  }, [name, surname, phone]);
  
  if (isFormValid) {
    onValidForm({name: name.value, surname: surname.value, phone})
  } else { isFormValid === true && setIsFormValid(false) }
  
  function handlePhoneChange(phone) {
    setPhone(phone);
  }
  console.log('form holder render');

  return (
    <div className="ui segment">
      <form className="ui form">
        <Input value={name.value} onChange={name.onChange} placeholder="Имя"/>
        <Input value={surname.value} onChange={surname.onChange} placeholder="Фамилия"/>
        <PhoneInput changeHandler={handlePhoneChange} value={phone} />
      </form>
    </div>
  );
}

function Input(props) {
  return <input {...props} />;
}

function PhoneInput(props) {
  return <ReactPhoneInput
    name="phone"
    value={props.value}
    onChange={props.changeHandler}
    containerClass="field"
    defaultCountry={'ru'}
    inputClass="form__phone"
  />
}

function useFormInput(initialValue='') {
  const [value, setValue] = useState(initialValue);
  
  function handleChange(e) {
    setValue(e.target.value);
  }

  return {
    value,
    onChange: handleChange,
    isValid: value.length > 3
  }
}
