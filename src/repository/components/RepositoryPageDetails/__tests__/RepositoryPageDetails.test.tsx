import { render, screen, fireEvent } from "@testing-library/react";
import type { Repository } from "@/repository/types";

import RepositoryPageDetails from "../RepositoryPageDetails";

const mockRepository: Repository = {
  id: 1,
  name: "react-awesome-ui",
  description: "A beautiful and responsive React UI component library",
  stars: 2543,
  forks: 342,
  watchers: 128,
  language: "TypeScript",
  updatedAt: "2025-10-15",
  url: "https://github.com/example/react-awesome-ui",
  topics: ["react", "ui-components", "typescript"],
  isFavorite: false,
};

describe("RepositoryPageDetails", () => {
  it("should match shapshot", () => {
    const { container } = render(
      <RepositoryPageDetails repository={mockRepository} />
    );
    expect(container).toMatchSnapshot();
  });

  it("should render repository title", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("react-awesome-ui")).toBeInTheDocument();
  });

  it("should render repository description", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(
      screen.getByText("A beautiful and responsive React UI component library")
    ).toBeInTheDocument();
  });

  it("should render stars count", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("2,543")).toBeInTheDocument();
  });

  it("should render forks count", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("342")).toBeInTheDocument();
  });

  it("should render watchers count", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("128")).toBeInTheDocument();
  });

  it("should render updated date", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("2025-10-15")).toBeInTheDocument();
  });

  it("should render language", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("should render all topics", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("ui-components")).toBeInTheDocument();
    expect(screen.getByText("typescript")).toBeInTheDocument();
  });

  it("should not render topics section if empty", () => {
    const repoWithoutTopics = { ...mockRepository, topics: [] };
    render(<RepositoryPageDetails repository={repoWithoutTopics} />);
    expect(screen.queryByText("Topics")).not.toBeInTheDocument();
  });

  it('should display "Add to Favorites" button when not favorited', () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    expect(screen.getByText("Add to Favorites")).toBeInTheDocument();
  });

  it('should display "Remove from Favorites" button when favorited', () => {
    const favoritedRepo = { ...mockRepository, isFavorite: true };
    render(<RepositoryPageDetails repository={favoritedRepo} />);
    expect(screen.getByText("Remove from Favorites")).toBeInTheDocument();
  });

  it("should call onSetFavorite with correct parameters when favorite button is clicked", () => {
    const onSetFavorite = jest.fn();
    render(
      <RepositoryPageDetails
        repository={mockRepository}
        onSetFavorite={onSetFavorite}
      />
    );

    const favoriteButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });
    fireEvent.click(favoriteButton);

    expect(onSetFavorite).toHaveBeenCalledWith(1, true);
  });

  it("should call onSetFavorite with false when removing from favorites", () => {
    const onSetFavorite = jest.fn();
    const favoritedRepo = { ...mockRepository, isFavorite: true };
    render(
      <RepositoryPageDetails
        repository={favoritedRepo}
        onSetFavorite={onSetFavorite}
      />
    );

    const removeButton = screen.getByRole("button", {
      name: /remove from favorites/i,
    });
    fireEvent.click(removeButton);

    expect(onSetFavorite).toHaveBeenCalledWith(1, false);
  });

  it("should handle missing onSetFavorite callback gracefully", () => {
    render(<RepositoryPageDetails repository={mockRepository} />);
    const favoriteButton = screen.getByRole("button", {
      name: /add to favorites/i,
    });

    expect(() => {
      fireEvent.click(favoriteButton);
    }).not.toThrow();
  });
});
