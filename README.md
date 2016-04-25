#SharePop

### Running instructions

Just clone the repository in any folder and open the `index.html` in your favorite browser. No installation is necessary.

You can see a running version on [http://sharepop.vedovelli.com.br](http://sharepop.vedovelli.com.br)

### Development notes

1. By reading `/script/main.js` you'll find an object named **SharePop** containing 3 main areas: **dom**, **data** and **methods**.

	* **dom**: holds references to all DOM elements that need to be accessed though Javascript;
	* **data**: holds the source data for the application;
	* **methods**: holds all application methods.
	
2. **Bootstraping**: the `Sharepop.methods.setup()` is the only method that needs to be called to bootstrap the whole application. It **sets up the event listeners**, **retrieve data from local storage** (if available, more about that below) and **assembles the initial list**.
3. Another important method is `SharePop.methods.assembleList(list)` which is called everytime the `SharePop.data.todos` array changes. This ensures the data and the DOM are always in sync.
4. All methods that are callbacks for event listeners are marked as **<method-name>EventHandler** and they usually deal with specific data and modify the DOM. If the **application data** needs to be changed, then a new method is created to handle that. This allows us to test everything that changes the data, without interfering with the DOM.

###UI and UX

I've tried to stick to the provided UI as much as possible. I took the liberty to add a **preferences pane** to the top right corner (look for the cog icon) so users can switch between themes and clear finished todos. Those two features were not present in the provided UI.

### Testing

Just point your browser to `/spec/runner.html` to see all tests runnning.

---

If you have any question please send an e-mail do **vedovelli@gmail.com**.