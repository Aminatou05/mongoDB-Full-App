const React = require('react');
const DefaultLayout = require('../layout/Default')

class Show extends React.Component {
    render() {
        const vegetable = this.props.vegetable;

        return (
            <DefaultLayout title="Show an Individual Fruit">
                <p>The {vegetable.name} is {vegetable.color}</p>
                {vegetable.readyToEat ? 'It is ready to eat' : "NOT READY!"}
                <br />
                <a href={`/fruits/${vegetable._id}/edit`}>Edit This Vegetable</a>
                <form action={`/fruits/${vegetable._id}?_method=DELETE`} method="POST">
                    <input type="submit" value="DELETE" />
                </form>
                <a href="/fruits">Back to Index</a>
            </DefaultLayout >

        )
    }
}

module.exports = Show;