import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import MovieCard from './MovieCard';

test('renders app', () => {
   render(<MovieCard Poster={"https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages-na.ssl-images-amazon.com%2Fimages%2FI%2F61F-Epj6A9L._SL1104_.jpg&imgrefurl=https%3A%2F%2Fwww.amazon.co.uk%2FTraditional-Black-White-Leather-Football%2Fdp%2FB00Y35LC1Y&docid=oCFiVJngf_UlYM&tbnid=YOIQOi3ZcMksyM%3A&vet=10ahUKEwibgtva8cvmAhV-63MBHU59BDcQMwh6KAEwAQ..i&w=1104&h=1096&bih=821&biw=1440&q=football&ved=0ahUKEwibgtva8cvmAhV-63MBHU59BDcQMwh6KAEwAQ&iact=mrc&uact=8"}
       Title="Football"
       Year="2018"
   />);
    expect(screen.getByText("Football")).toBeInTheDocument()
    expect(screen.getByText("2018")).toBeInTheDocument()
});
