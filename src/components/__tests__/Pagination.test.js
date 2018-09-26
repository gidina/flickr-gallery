
import React from "react";
import ReactTestUtils from "react-dom/test-utils";
import renderer from "react-test-renderer";
import Pagination from "../Pagination";

test("Es renderitzen un total de pàgines corresponent al nombre de fotos total entre el nombre d'elements per pàgina", () => {
    const numItemsPage = 8;
    const tree = renderer
        .create(<Pagination numItems={numItemsPage} onPageChange={() => {}} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

test("per defecte es mostren les primeres 8 fotos (onPageChange es crida amb 0, 7) i la primera pàgina està en red (classe 'active')", () => {
    const numItemsPage = 8;

    const onPageChangeMock = jest.fn();
    const tree = ReactTestUtils.renderIntoDocument(<Pagination numItems={numItemsPage} onPageChange={onPageChangeMock} />);

    let paginationElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(tree, "li");
    paginationElements.shift();  // Removes the first li element (<<)

    const firstPage = paginationElements[0];

    expect(firstPage.className).toEqual("active");
    expect(onPageChangeMock).toHaveBeenNthCalledWith(1, 0, numItemsPage - 1);
});

test("faig click a una pàgina i aquesta passa a ser activa (onPageChange es crida correctament*)", () => {
    const numItemsPage = 8;

    const onPageChangeMock = jest.fn();
    const tree = ReactTestUtils.renderIntoDocument(<Pagination numItems={numItemsPage} onPageChange={onPageChangeMock} />);
    let paginationElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(tree, "li");
    paginationElements.shift();  // Removes the first li element (<<)
    paginationElements.pop();    // Removes the last li element (>>)

    const indexPage = 1;
    const secondPage = paginationElements[indexPage];

    expect(secondPage.className).toEqual("");

    ReactTestUtils.Simulate.click(secondPage, indexPage);

    expect(secondPage.className).toEqual("active");

    const startIndexItem = indexPage * numItemsPage;
    const endIndexItem = startIndexItem + (numItemsPage - 1);

    expect(onPageChangeMock).toHaveBeenNthCalledWith(2, startIndexItem, endIndexItem);
});

test("faig click a << i la pàgina activa passa a ser l'anterior (excepte si estic a la primera)", () => {
    const numItemsPage = 8;

    const onPageChangeMock = jest.fn();
    const tree = ReactTestUtils.renderIntoDocument(<Pagination numItems={numItemsPage} onPageChange={onPageChangeMock} />);
    let paginationElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(tree, "li");

    const backLi = paginationElements[0]; // <<
    const indexPage = 1 + 1; // first element is back li element
    const firstPage = paginationElements[indexPage-1];
    const secondPage = paginationElements[indexPage];

    ReactTestUtils.Simulate.click(secondPage, indexPage);

    expect(secondPage.className).toEqual("active");

    ReactTestUtils.Simulate.click(backLi, indexPage - 1);

    expect(secondPage.className).toEqual("");
    expect(firstPage.className).toEqual("active");

    const startIndexItem = (indexPage - 1) * numItemsPage;
    const endIndexItem = startIndexItem + (numItemsPage - 1);

    expect(onPageChangeMock).toHaveBeenNthCalledWith(2, startIndexItem, endIndexItem);
});

test("faig click a >> i la pàgina activa passa a ser la següent (excepte si estic a l'última)", () => {
    const numItemsPage = 8;
    const defaultActivePage = 0;
    const onPageChangeMock = jest.fn();

    const tree = ReactTestUtils.renderIntoDocument(<Pagination numItems={numItemsPage} onPageChange={onPageChangeMock} />);
    let paginationElements = ReactTestUtils.scryRenderedDOMComponentsWithTag(tree, "li");

    const forwardLi = paginationElements[paginationElements.length - 1]; // >>
    const firstPage = paginationElements[0+1]; // first element is back li element
    const secondPage = paginationElements[1+1]; // first element is back li element

    expect(firstPage.className).toEqual("active");

    ReactTestUtils.Simulate.click(forwardLi);

    expect(firstPage.className).toEqual("");
    expect(secondPage.className).toEqual("active");

    const startIndexItem = (defaultActivePage + 1) * numItemsPage;
    const endIndexItem = startIndexItem + (numItemsPage - 1);

    expect(onPageChangeMock).toHaveBeenNthCalledWith(2, startIndexItem, endIndexItem);
});