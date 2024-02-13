import {Component} from 'react';
import Card from '../card/card.component';
import './card-list.styles.css';

class CardList extends Component {
   
    render() {
        console.log('render from CardList');
        const { monsters } = this.props;
        console.log(monsters);
        return (
            <div className="card-list">
                {
                    monsters.map((monster) => {
                        return <Card monster={monster}/>;
                        // return <h1 key={monster.id}>{monster.name}</h1>;
                    })
                }
            </div>
        );
    }
}

export default CardList;