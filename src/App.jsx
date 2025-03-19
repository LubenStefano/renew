import './App.css'

function App() {

  return (
    <>
      <header>
        <div className="navbar">
          <div className="logo">ReNew</div>
          <div className='search'>
          <input type="text" placeholder="Какво търсиш?" />
          <button>Търсене</button>
          </div>
          <nav>
          <button className="add-btn" >Регистрирай се</button>
          <button className="add-btn">Влез</button>
          <button className="add-btn">Профил</button>
          <button className="add-btn">Добави обява</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="categories">
          <h2>Главни категории</h2>
          <div className="category-grid">
            <div className="category">Мода</div>
            <div className="category">Електроника</div>
            <div className="category">Спорт</div>
            <div className="category">Дом и градина</div>
          </div>
        </section>

        <section className="promotions">
          <h2>Промо обяви</h2>
          <div className="promo-grid">
            <div className="promo-item">
              <img src="https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Колело" />
              <div className="promo-details">
                <p>Име: Колело</p>
                <p>Цена: 200 лв</p>
                <p>Дата: 01.01.2023</p>
                <button>Детайли</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://images.pexels.com/photos/159192/vespa-roller-motor-scooter-cult-159192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Скутер" />
              <div className="promo-details">
                <p>Име: Скутер</p>
                <p>Цена: 300 лв</p>
                <p>Дата: 02.01.2023</p>
                <button>Детайли</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://images.pexels.com/photos/19090/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Маратонки" />
              <div className="promo-details">
                <p>Име: Маратонки</p>
                <p>Цена: 100 лв</p>
                <p>Дата: 03.01.2023</p>
                <button>Детайли</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://images.pexels.com/photos/2113994/pexels-photo-2113994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Часовник" />
              <div className="promo-details">
                <p>Име: Часовник</p>
                <p>Цена: 150 лв</p>
                <p>Дата: 04.01.2023</p>
                <button>Детайли</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://images.pexels.com/photos/2977304/pexels-photo-2977304.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Чанта" />
              <div className="promo-details">
                <p>Име: Чанта</p>
                <p>Цена: 80 лв</p>
                <p>Дата: 05.01.2023</p>
                <button>Детайли</button>
              </div>
            </div>
            <div className="promo-item">
              <img src="https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Слушалки" />
              <div className="promo-details">
                <p>Име: Слушалки</p>
                <p>Цена: 120 лв</p>
                <p>Дата: 06.01.2023</p>
                <button>Детайли</button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
