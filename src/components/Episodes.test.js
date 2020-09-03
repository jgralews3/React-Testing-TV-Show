import React from 'react';
import Episodes from './Episodes'
import {render, waitFor} from '@testing-library/react'
import {fetchShow as mockFetchShow} from '../api/fetchShow'

jest.mock('../api/fetchShow')

const data = {
    data: {
        name: "Stranger Things", 
        image: {original: "http://static.tvmaze.com/uploads/images/original_untouched/200/501942.jpg"}, 
        summary: "A love letter to the '80s classics that captivated a generation, Stranger Things is set in 1983 Indiana, where a young boy vanishes into thin air. As friends, family and local police search for answers, they are drawn into an extraordinary mystery involving top-secret government experiments, terrifying supernatural forces and one very strange little girl.",
        _embedded: {episodes: [{airdate: "2016-07-15", airstamp: "2016-07-15T12:00:00+00:00", id: 553946, name: "Chapter One: The Vanishing of Will Byers", number: 1, runtime: 60, season: 1, summary: "<p>A young boy mysteriously disappears, and his panicked mother demands that the police find him. Meanwhile, the boy's friends conduct their own search, and meet a mysterious girl in the forest.</p>", url: "http://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers"}]}
}
}

test ("Episodes loads Api", async ()=>{
    mockFetchShow.mockResolvedValueOnce(data);
    const {getByText, rerender} = render(<Episodes episodes={[]} />)
    rerender(<Episodes episodes={data.data._embedded.episodes} />)
    await waitFor(()=> {
        expect(getByText(/Chapter One/i)).toBeInTheDOM;
    })
})