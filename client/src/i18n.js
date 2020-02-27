import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      title: "Hotel",
      welcome: "Podil Plaza Kyiv",
      more: "Tell Me More",
      menu: "Menu",
      bookBtn: "Book Now",
      resTitle: "Reservations",
      newsTitle: "Our News",
      guestCount: "Guests",
      kidCount: "Children",
      checkIn: "Check In",
      checkOut: "Check Out",
      checkAvail: "Check Availability",
      servicesTitle: "Services",
      about: "About OUr Hotel",
      rooms: "Rooms",
      roomsDesc: "Rooms In Our Hotel",
      restaurant: "Restaurant",
      restDesc: "Breakfast, Lunch and Dinner Menus",
      extras: "Extras",
      extrasDesc: "Pool and Sauna",
      contactTitle: "Contact Us",
      contactDesc: "Please send us a message and we will contact you",
      contactName: "Your Name *",
      contactEmail: "Your Email *",
      contactPhone: "Your Phone Number *",
      contactMsg: "Your Message *",
      sendMsg: "Send Message",
      aboutTitle: "About Us"

    }
  },
  uk: {
    translation: {
      title: "Готель",
      welcome: "Поділь Плаза Київ",
      more: "Дізнатись Більше",
      menu: "Меню",
      bookBtn: "Резервувати",
      resTitle: "Резервації",
      newsTitle: "Наші Новини",
      guestCount: "Дорослих",
      kidCount: "Дітей",
      checkIn: "Заїзд",
      checkOut: "Виїзд",
      checkAvail: "Бронювати",
      servicesTitle: "Сервіс Готелю",
      about: "Про нас",
      rooms: "Кімнати",
      roomsDesc: "Кімнати в нашому готелю",
      restaurant: "Ресторан",
      restDesc: "Меню на сніданок, обід, вечерю",
      extras: "Додаткові Послуги",
      extrasDesc: "Бассейн і Сауна",
      contactTitle: "Напишіть Нам",
      contactDesc: "Відішліть нам повідомлення і ми відпишемо вам",
      contactName: "Ваще Імя *",
      contactEmail: "Ваш Емайл *",
      contactPhone: "Ваш Телефон *",
      contactMsg: "Ваше Повідомлення *",
      sendMsg: "Відіслатати",
      aboutTitle: "Про Нас"    
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next  //
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome //

    interpolation: {
      escapeValue: false // react already safe from xss //
    }
  });

  export default i18n;