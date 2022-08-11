import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './Calendar.scss';

import { CalendarDay, DateRangePicker, DayPickerSingleDateController } from 'react-dates';

import React from 'react';
import { TimePicker } from '../TimePicker';
import classNames from 'classnames/bind';
import moment from 'moment';
import { scroller } from 'react-scroll';
import styles from './Calendar.module.scss';

const cx = classNames.bind(styles);
moment.locale('ko', {
  weekdaysShort: ['일', '월', '화', '수', '목', '금', '토'],
});
function renderNavNextButton(buttonProps) {
  const { ariaLabel, disabled, onClick, onKeyUp, onMouseUp } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={(e) => {
        onClick();
        buttonProps?.monthChange && buttonProps?.monthChange();
      }}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{
        position: 'absolute',
        top: 15,
        right: 0,
        padding: 0,
        background: 'none',
        zIndex: 3,
      }}
      type="button"
    >
      <img
        src={require('Assets/arrow_right.png').default}
        alt="arrow-right"
        width="10px"
        height="18px"
      />
    </button>
  );
}
function renderNavPrevButton(buttonProps) {
  const { ariaLabel, disabled, onClick, onKeyUp, onMouseUp } = buttonProps;

  return (
    <button
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onKeyUp={onKeyUp}
      onMouseUp={onMouseUp}
      style={{
        position: 'absolute',
        top: 15,
        left: 0,
        padding: 0,
        background: 'none',
        zIndex: 3,
      }}
      type="button"
    >
      <img
        src={require('Assets/arrow_left.png').default}
        alt="arrow-left"
        width="10px"
        height="18px"
      />
    </button>
  );
}
function SpecificBlockPicker(props) {
  const [date, setDate] = React.useState(props.DefaultDate);
  const [focused, setFocused] = React.useState(false);
  const [render, setRender] = React.useState(false);
  const [dates, setDates] = React.useState(props.LunchingDate);
  const [currentMonth, setCurrentMonth] = React.useState();
  const [minMonth, setMinMonth] = React.useState(undefined);
  const [maxMonth, setMaxMonth] = React.useState(undefined);
  function navCheckMonth() {
    let checkMonth = true;
    let preDay = null;
    props?.LunchingDate?.map((e, idx) => {
      let temp = moment(e).format('MM');
      if (preDay === null || temp === preDay) {
        preDay = temp;
      } else if (temp !== preDay) {
        preDay = temp;
        checkMonth = false;
      }
    });
    return checkMonth;
  }
  function setDateDisable() {
    props.LunchingDate.map((e, idx) => {
      let userDate = moment(e).format('YYYYMMDD');
      let nowDate = moment().format('YYYYMMDD');
      if (nowDate > userDate) {
        let dateItem = document?.querySelector(
          `td[aria-label="${moment(e).format('ddd요일, YYYY년 M월 D일')}"]`,
        );
        let dateItemSelect = document?.querySelector(
          `td[aria-label="Selected. ${moment(e).format('ddd요일, YYYY년 M월 D일')}"]`,
        );

        if (dateItem !== null) {
          dateItem?.classList.add('finish-date');
        } else if (dateItemSelect !== null) {
          dateItemSelect?.classList.add('finish-date');
          dateItemSelect?.classList.add('finish-date-select');
        }
      }
    });
  }
  React.useEffect(() => {
    const sortedDate = props?.LunchingDate.sort((a, b) => a - b);
    setMinMonth(sortedDate[0]);
    setMaxMonth(sortedDate[sortedDate.length - 1]);
    setDateDisable();
  }, [render, date, props?.DefaultDate]);
  return (
    <>
      <div className={cx('homeoffice-calendar', 'calendar-style')}>
        <div className={cx('calendar-color')} />
        <DayPickerSingleDateController
          minDate={moment(minMonth)}
          maxDate={moment(maxMonth)}
          hideKeyboardShortcutsPanel={true}
          noNavButtons={navCheckMonth()}
          monthFormat={'YYYY.MM'}
          date={date}
          daySize={46}
          onDateChange={(value) => {
            props.DateSelect(value);
            setDate(value);
          }}
          focused
          initialVisibleMonth={() => props?.DefaultDate}
          keepOpenOnDateSelect={true}
          isDayBlocked={(momentDate) => {
            let success = true;
            let calendarDate = momentDate.format('YYYYMMDD');
            props.LunchingDate.map((e, idx) => {
              if (calendarDate === e) {
                success = false;
                setRender(true);
              }
            });
            return success;
          }}
          renderNavNextButton={function (buttonProps) {
            const { ariaLabel, disabled, onClick, onKeyUp, onMouseUp } = buttonProps;
            return (
              <button
                aria-label={ariaLabel}
                disabled={disabled}
                onClick={(e) => {
                  onClick();
                  setDateDisable();
                }}
                onKeyUp={onKeyUp}
                onMouseUp={onMouseUp}
                style={{
                  position: 'absolute',
                  top: 15,
                  right: 0,
                  padding: 0,
                  background: 'none',
                  zIndex: 3,
                }}
                type="button"
              >
                <img
                  src={require('Assets/arrow_right.png').default}
                  alt="arrow-right"
                  width="10px"
                  height="18px"
                />
              </button>
            );
          }}
          renderNavPrevButton={function (buttonProps) {
            const { ariaLabel, disabled, onClick, onKeyUp, onMouseUp } = buttonProps;
            return (
              <button
                aria-label={ariaLabel}
                disabled={disabled}
                onClick={(e) => {
                  onClick();
                  setDateDisable();
                }}
                onKeyUp={onKeyUp}
                onMouseUp={onMouseUp}
                style={{
                  position: 'absolute',
                  top: 15,
                  left: 0,
                  padding: 0,
                  background: 'none',
                  zIndex: 3,
                }}
                type="button"
              >
                <img
                  src={require('Assets/arrow_left.png').default}
                  alt="arrow-left"
                  width="10px"
                  height="18px"
                />
              </button>
            );
          }}
        />
      </div>
    </>
  );
}
function DateRange(props) {
  const [startDate, setStartDate] = React.useState(null);
  const [endDate, setEndDate] = React.useState(null);
  const [focusedInput, setFocusedInput] = React.useState(null);
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  const SelectCompletePanel = () => {
    return (
      <div
        className={cx('calendar-info')}
        style={{
          borderTop: '1px solid #ddd',
        }}
      >
        <span>
          <span>✔️</span> 최소 모객 기간이 필요해요.
        </span>
        바로 진행을 하고 싶은데, 그럴 수 없어서 당황하셨죠? 공간여행을 진행하기 위해서는{' '}
        <strong>1주간의 최소 마케팅 기간</strong>이 필요해요. 마케팅을 통해 호스트님의 공간여행을
        널리 알리기 위해서죠! 그렇기 때문에 시작일과 종료일 선택 전, 이러한 충분한 여유 기간이
        필요하다는 점을 기억해 주세요 : )
        <button
          style={{
            borderTop: '1px solid #ddd',
            background: startDate !== null && endDate !== null ? 'rgb(30, 30, 30)' : '#dddddd',
          }}
          onClick={() => (startDate !== null && endDate !== null ? setFocusedInput(null) : null)}
        >
          선택 완료
        </button>
      </div>
    );
  };
  return (
    <>
      <div className={cx('date-range-calendar', 'calendar-style')}>
        <DateRangePicker
          renderNavNextButton={renderNavNextButton}
          renderNavPrevButton={renderNavPrevButton}
          hideKeyboardShortcutsPanel={true}
          startDate={startDate}
          startDateId="start-date"
          endDate={endDate}
          endDateId="end-date"
          onDatesChange={handleDatesChange}
          focusedInput={focusedInput}
          onFocusChange={(focusedInput) => {
            if (focusedInput) {
              setFocusedInput(focusedInput);
            }
          }}
          startDatePlaceholderText="시작일을 선택하세요"
          endDatePlaceholderText="종료일을 선택하세요"
          readOnly={true}
          daySize={36}
          monthFormat={'YYYY.MM'}
          displayFormat={'MM월 DD일(ddd)'}
          noBorder
          renderCalendarInfo={() => <SelectCompletePanel />}
        />
      </div>
    </>
  );
}

function DateTimeRange(props) {
  const [time, setTime] = React.useState(null);
  const [date, setDate] = React.useState(null);
  const [focused, setFocused] = React.useState(true);
  const [dateTime, setDateTime] = React.useState('진행일과 시간을 선택해 주세요.');
  const [inputOpen, setInputOpen] = React.useState(true);
  const [displaySize, setDisplaySize] = React.useState(scroller.get('root').clientWidth <= 550);
  const [displaySizeXS, setDisplaySizeXS] = React.useState(scroller.get('root').clientWidth <= 427);
  const [moStep, setMoStep] = React.useState(1);

  const modalRef = React.useRef();
  const inputRef = React.useRef();
  React.useEffect(() => {
    window.addEventListener('resize', () => {
      setDisplaySize(scroller.get('root').clientWidth <= 550);
      setDisplaySizeXS(scroller.get('root').clientWidth <= 427);
    });
    return window.removeEventListener('resize', () => {
      setDisplaySize(scroller.get('root').clientWidth <= 550);
      setDisplaySizeXS(scroller.get('root').clientWidth <= 427);
    });
  }, []);

  const getTime = (getTime) => {
    if (getTime !== null && getTime !== 'Invalid date') {
      setTime(getTime);
    } else {
      setTime(null);
    }
  };
  const changeDateTime = () => {
    const dateFormat = moment(date).format('YYYY.MM.DD(ddd)');
    const timeFormat = moment(time).format('a hh:mm');
    setInputOpen(!inputOpen);
    setDateTime(dateFormat + ' / ' + timeFormat);
    props.onChangeHandler(time, date);
  };

  let calendarLoad = false;
  const handleClickOutside = ({ target }) => {
    if (scroller.get('root').clientWidth > 550) {
      if (!inputRef.current.contains(target) && !modalRef.current.contains(target) && calendarLoad)
        setInputOpen(false);
    }
  };
  React.useEffect(() => {
    window.addEventListener('load', function (event) {
      calendarLoad = true;
    });

    window.addEventListener('click', handleClickOutside);
    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);
  return (
    <>
      <div className={cx('date-time-calendar', 'calendar-style')}>
        <input
          className={cx('date-time-input', inputOpen ? 'open' : 'close')}
          value={dateTime}
          onClick={() => setInputOpen(!inputOpen)}
          ref={inputRef}
          readOnly
          style={{ color: dateTime !== '진행일과 시간을 선택해 주세요.' ? '#212121' : '#919191' }}
        />
        <div ref={modalRef}>
          <div className={cx(inputOpen ? '' : 'hide', displaySize && 'calendar-mobile')}>
            {((moStep === 1 && displaySize) || !displaySize) && (
              <>
                <div className={cx('calendar-color')} />

                <DayPickerSingleDateController
                  numberOfMonths={1}
                  renderNavNextButton={renderNavNextButton}
                  renderNavPrevButton={renderNavPrevButton}
                  hideKeyboardShortcutsPanel={true}
                  monthFormat={'YYYY.MM'}
                  date={date}
                  daySize={!displaySize ? 40 : displaySizeXS ? 37 : 40}
                  onDateChange={(value) => {
                    setDate(value);
                  }}
                  focused={focused}
                  onFocusChange={(value) => setFocused(true)}
                  initialVisibleMonth={() => date ?? moment().add(22, 'd')}
                  isDayBlocked={(day) => {
                    return day.diff(moment(), 'days') < 21;
                  }}
                />
              </>
            )}
            {(!displaySize || (displaySize && moStep === 2)) && (
              <TimePicker
                borderLeft={!displaySize}
                use12Hours={true}
                timeValue={time}
                ChangeHandler={(value) => getTime(value)}
                Inputexist={false}
                TimeFormat={displaySize ? false : 'a hh시 mm분'}
                mobileSetTime={displaySize ? moment(date).format('YYYY.MM.DD(ddd)') : false}
              />
            )}
          </div>
          <div className={cx('calendar-info-container', inputOpen ? '' : 'hide')}>
            <div className={cx('calendar-info')}>
              <span>
                <span>✔️</span> 최소 모객 기간이 필요해요.
              </span>
              바로 진행을 하고 싶은데, 그럴 수 없어서 당황하셨죠? 남의집을 진행하기 위해서는{' '}
              <strong>3주간의 최소 모객 기간</strong>이 필요해요. 모객 기간 동안 비슷한 취향을 가진
              게스트들을 쏙쏙 모셔오기 위해서죠! 그렇기 때문에 진행일 선택 전, 이러한 충분한 여유
              기간이 필요하다는 점을 기억해 주세요 :)
              {!displaySize && (
                <button
                  style={{
                    backgroundColor: (time === null || date === null) && '#dddddd',
                  }}
                  onClick={() => (time !== null && date !== null ? changeDateTime() : null)}
                >
                  선택 완료
                </button>
              )}
            </div>
            {displaySize && (
              <div style={{ justifyContent: moStep === 1 ? 'flex-end' : 'space-between' }}>
                {moStep === 2 && (
                  <>
                    <div onClick={() => setMoStep(1)}>
                      <img
                        src={require('../../../../assets/arrow_left.png').default}
                        alt="arrow-left"
                      />
                      이전
                    </div>
                  </>
                )}
                {moStep === 1 && (
                  <>
                    <button
                      style={{
                        backgroundColor: date !== null ? 'rgb(30, 30, 30)' : '#dddddd',
                      }}
                      onClick={() => (date !== null ? setMoStep(2) : null)}
                    >
                      다음
                    </button>
                  </>
                )}
                {moStep === 2 && (
                  <>
                    <button
                      style={{
                        backgroundColor:
                          time !== null && date !== null ? 'rgb(30, 30, 30)' : '#dddddd',
                      }}
                      onClick={() => (time !== null && date !== null ? changeDateTime() : null)}
                    >
                      선택 완료
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function MultiDatePicker(props) {
  const [dates, setDates] = React.useState(props?.date ?? []);
  const handleChange = (date) => {
    let onlyDates = dates?.filter(
      (propsDate) => moment(propsDate).format('YYYYMMDD') !== 'Invalid date',
    );
    const newDates = onlyDates?.includes(moment(date).format('YYYYMMDD'))
      ? onlyDates.filter((d) => {
          let dateItemSelect = document?.querySelector(
            `td[aria-label="${moment(date).format('ddd요일, YYYY년 M월 D일')}"]`,
          );
          if (dateItemSelect !== null) {
            dateItemSelect?.classList.remove('multi-select-date');
          }

          return !(moment(date).format('YYYYMMDD') === d);
        })
      : [...onlyDates, moment(date).format('YYYYMMDD')];
    setDates(newDates);
    props?.onChange(newDates);
  };
  React.useEffect(() => {
    dates.map((userDate, idx) => {
      let dateItemSelect = document?.querySelector(
        `td[aria-label="${moment(userDate).format('ddd요일, YYYY년 M월 D일')}"]`,
      );
      if (dateItemSelect !== null) {
        dateItemSelect?.classList.add('multi-select-date');
      }
    });
  }, [dates]);

  return (
    <div className={cx('calendar-style', 'multi-date-picker')}>
      <div className={cx('calendar-color')} />
      <DayPickerSingleDateController
        renderNavNextButton={renderNavNextButton}
        renderNavPrevButton={renderNavPrevButton}
        numberOfMonths={1} //2
        daySize={40}
        onDateChange={handleChange}
        hideKeyboardShortcutsPanel
        noBorder
        monthFormat={'YYYY.MM'}
        // renderCalendarDay={(props) => {
        //   try {
        //     const { day, modifiers } = props;

        //     if (dates?.includes(moment(day).format('YYYYMMDD'))) {
        //       modifiers && modifiers.add('selected');
        //     } else {
        //       modifiers && modifiers.delete('selected');
        //     }
        //     return <CalendarDay {...props} modifiers={modifiers} />;
        //   } catch (e) {
        //     window.alert(JSON.stringify(e));
        //     window.alert(JSON.stringify({ e }));
        //   }
        // }}
        isDayBlocked={(momentDate) => {
          let success = true;
          let calendarDate = momentDate.format('YYYYMMDD');
          let StartDate = moment().format('YYYYMMDD');
          let endDate = moment().add(21, 'days').format('YYYYMMDD');
          if (StartDate <= calendarDate) {
            // if (calendarDate <= endDate) {
            //   success = false;
            // } else {
            //   success = true;
            // }
            success = false;
          }
          return success;
        }}
      />
    </div>
  );
}

export { SpecificBlockPicker, DateRange, DateTimeRange, MultiDatePicker };
