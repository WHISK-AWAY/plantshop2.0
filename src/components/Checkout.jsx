import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkout } from '../slices/checkout/checkoutSlice';
import { selectCheckout } from '../slices/checkout/checkoutSlice';
import { selectUsers } from '../slices/users/userSlice';
import { fetchSingleUser } from '../slices/users/userSlice';
import { selectAuth } from '../slices/users/authSlice';
import axios from 'axios';

import btnHover from '../style_utils'

const { VITE_API_URL } = import.meta.env;

export default function Checkout() {
  const dispatch = useDispatch();

  const checkoutState = useSelector(selectCheckout);
  const auth = useSelector(selectAuth);
  const user = useSelector(selectUsers);
  const [invalidEmailMessage, setInvalidEmailMessage] =
    useState('Enter your email');
  const [invalidZipMessage, setInvalidZipMessage] = useState(
    'Enter your zip code'
  );

  const [isInvalid, setIsInvalid] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street1: '',
    street2: '',
    city: '',
    state: '',
    zip: '',
    promoCode: '',
  });

  const token = window.localStorage.getItem('token');

  useEffect(() => {
    if (token && auth.auth && auth.auth.id) {
      dispatch(fetchSingleUser({ id: auth.auth.id, token }));
    }
  }, [dispatch, token, auth]);

  useEffect(() => {
    if (user && user.user && user.user.id) {
      const tempFormData = {};

      tempFormData.firstName = user.user.firstName || '';
      tempFormData.lastName = user.user.lastName || '';
      tempFormData.email = user.user.email || '';

      if (user.user.shippings.length > 0) {
        tempFormData.street1 = user.user.shippings[0].street1 || '';
        tempFormData.street2 = user.user.shippings[0].street2 || '';
        tempFormData.city = user.user.shippings[0].city || '';
        tempFormData.state = user.user.shippings[0].state || '';
        tempFormData.zip = user.user.shippings[0].zip || '';
      } else {
        tempFormData.street1 = '';
        tempFormData.street2 = '';
        tempFormData.city = '';
        tempFormData.state = '';
        tempFormData.zip = '';
      }

      tempFormData.promoCode = '';

      setFormData(tempFormData);
    }
  }, [user]);

  const validateEmail = (email) => {
    // from https://www.w3docs.com/snippets/javascript/how-to-validate-an-e-mail-using-javascript.html
    let res = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return res.test(email);
  };

  const validateZip = (zip) => {
    let res = /^\d+$/;
    return res.test(zip);
  };

  const states = [
    'Alabama',
    'Alaska',
    'American Samoa',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'District of Columbia',
    'Florida',
    'Georgia',
    'Guam',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Minor Outlying Islands',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Northern Mariana Islands',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Puerto Rico',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'U.S. Virgin Islands',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    setIsInvalid(false);

    let invalid = false;

    if (formData.promoCode !== '') {
      let promoCheck = await axios.get(
        VITE_API_URL + '/api/promos/byName/' + formData.promoCode
      );
      if (promoCheck.id === undefined) {
        setIsInvalid(true);
        setFormData({ ...formData, promoCode: '' });
      }
    }

    if (!validateEmail(formData.email)) {
      setFormData({ ...formData, email: '' });
      setInvalidEmailMessage('Invalid email format');
      setIsInvalid(true);
      invalid = true;
    }

    if (!validateZip(formData.zip)) {
      setFormData({ ...formData, zip: '' });
      setInvalidZipMessage('Invalid zip code format');
      setIsInvalid(true);
      invalid = true;
    }

    if (
      formData.firstName === '' ||
      formData.lastName === '' ||
      formData.email === '' ||
      formData.street1 === '' ||
      formData.city === '' ||
      formData.state === '' ||
      formData.zip === '' ||
      formData.zip.length > 9
    ) {
      setIsInvalid(true);
      invalid = true;
    }
    if (invalid) return;

    dispatch(
      checkout({
        name: {
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        userEmail: formData.email,
        address: {
          street1: formData.street1,
          street2: formData.street2,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
        },
        promoCode: formData.promoCode,
      })
    );
  };

  useEffect(() => {
    if (checkoutState && checkoutState.checkout) {
      window.location = checkoutState.checkout;
    }
  }, [checkoutState]);


  btnHover()

  return (
    <div className="relative bg-[url('/assets/misc_bg/ship1.webp')] bg-cover bg-center bg-no-repeat font-outfit  portrait:w-full landscape:lg:h-[100svh] portrait:overflow-y-auto h-full portrait:h-[100svh]">
      <h2 className='pt-5 pb-1 text-center text-[2.3vw] 2xl:text-[2vw] 2xl:py-4 font-bold text-white lg:pb-5 xl:pt-9 5xl:text-[2rem] portrait:text-[5vw] portrait:pb-3 portrait:md:text-[3vw] portrait:lg:text-[4vw] portrait:pt-28 landscape:pt-20 portrait:md:pt-44 landscape:lg:pt-28 landscape:xl:pt-[12%] landscape:short:pt-28 landscape:5xl:pt-56'>
        SHIPPING INFORMATION
      </h2>
      <div className='flex w-full justify-center pb-10'>
        <div className=' border border-white/80 bg-white bg-opacity-50  md:py-3 lg:py-5  px-10 6xl:py-8 5xl:py-5 md:w-2/5 3xl:w-3/12 5xl:w-5/6 5xl:max-w-2xl portrait:w-[95vw]  portrait:py-7 landscape:w-[60svw] landscape:py-3 portrait:md:w-[80svw] landscape:lg:w-[60dvh]'>
          <section className=' flex flex-col'>
            <form onSubmit={handleSubmit}>
              <div className='mb-2 text-[1vw] 5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw] '>
                <label
                  className='mb-[1px] block text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='firstName'
                >
                  First Name
                </label>
                <input
                  className=' w-full appearance-none   py-1 px-2 leading-tight text-gray-700  shadow focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  id='firstName'
                  type='text'
                  name='firstName'
                  placeholder={isInvalid ? 'Enter your first name' : null}
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px]  block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='lastName'
                >
                  Last Name
                </label>
                <input
                  className='  w-full appearance-none  py-1 px-2 leading-tight text-gray-700 shadow  focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='text'
                  name='lastName'
                  placeholder={isInvalid ? 'Enter your last name' : null}
                  id='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px]  block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='email'
                >
                  Email
                </label>
                <input
                  className=' w-full appearance-none   py-1 px-2 leading-tight text-gray-700 shadow  focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='email'
                  name='email'
                  placeholder={isInvalid ? invalidEmailMessage : null}
                  id='email'
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px]  block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='street1'
                >
                  Street1
                </label>
                <input
                  className=' w-full appearance-none   py-1 px-2 leading-tight text-gray-700 shadow focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='text'
                  name='street1'
                  placeholder={isInvalid ? 'Enter your address' : null}
                  id='street1'
                  value={formData.street1}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px]  block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='street1'
                >
                  Street2
                </label>
                <input
                  className=' w-full appearance-none  py-1 px-2 leading-tight text-gray-700 shadow  focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='text'
                  name='street2'
                  id='street2'
                  value={formData.street2}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px]  block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='city'
                >
                  City
                </label>
                <input
                  className=' w-full appearance-none  py-1 px-2 leading-tight text-gray-700 shadow focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='text'
                  name='city'
                  placeholder={isInvalid ? 'Enter your city' : null}
                  id='city'
                  value={formData.city}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px]  block text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='state'
                >
                  State
                </label>
                <select
                  className=' w-full appearance-none  py-1 px-2 leading-tight text-gray-700 shadow focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  name='state'
                  id='state'
                  value={formData.state}
                  onChange={handleChange}
                >
                  <option value=''>Select your state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px] block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='state'
                >
                  Zip
                </label>
                <input
                  className=' w-full appearance-none  py-1 px-2 leading-tight text-gray-700 shadow  focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='text'
                  name='zip'
                  minLength='5'
                  maxLength='9'
                  placeholder={isInvalid ? invalidZipMessage : null}
                  id='zip'
                  value={formData.zip}
                  onChange={handleChange}
                />
              </div>

              <div className='mb-2 text-[1vw]  5xl:text-[.8vw] portrait:text-[3.8vw] portrait:md:text-[2.3vw]'>
                <label
                  className='mb-[1px] block  text-green-gray landscape:text-[.7rem] landscape:5xl:text-[1rem]'
                  htmlFor='state'
                >
                  Promo Code
                </label>
                <input
                  className=' w-full appearance-none  py-1 px-2 leading-tight text-gray-700 shadow  focus:outline-none landscape:text-[.8rem] landscape:5xl:text-[1rem]'
                  type='text'
                  name='promoCode'
                  id='promoCode'
                  value={formData.promoCode}
                  placeholder={
                    checkoutState.error === 'Invalid promo code'
                      ? 'Invalid promo code'
                      : null
                  }
                  onChange={handleChange}
                />
              </div>
            </form>

            <div className='lg:pt-4 portrait:pt-4  self-center w-full'>
              <button
                className='btn 5xl:text-[.9vw] text-[1.2vw]  mx-auto block  w-full  portrait:md:text-[2.9vw] py-1 text-white ease-out  transition-all duration-700 portrait:text-[4.3vw] landscape:text-[.8rem] landscape:2xl:text-[1rem] landscape:5xl:text-[1.3rem]'
                type='submit'
                onClick={handleSubmit}
              >
                <span>proceed to payment</span>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
