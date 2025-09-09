### Resources

- [DDD.org](http://domaindrivendesign.org/)
- [Domainlanguaguage.com](http://www.domainlanguage.com/)
- [Event Storming](https://en.wikipedia.org/wiki/Event_storming)
- https://ddd-crew.github.io/ddd-starter-modelling-process/

### Summary

- DDD is a way of thinking that creates a design based on the business needs of the organization
- Its value is derived from the simplification of complexities in the domain.
- The goal is to focus on business contexts individually and align knowledge to one source of truth
- DDD is  an iterative process that refines the model through learning
- Goes hand in hand with CQRS and OOD, makes it easy to prototype during iterations

## What

- A software design tool and a way of thinking that base domain modelling on a *business driven concept*
- A design that strives on communication between domain experts and software architects
* A centralized knowledge-rich design 
* An iterative, adaptive process of discovery and challenges that lead to learning and continuous improvement.

## Why

* Based on agile principles
* Focuses on the core problems that the system is expected to solve.
* Beneficial for complex domains and business areas
* Manages to organize and simplify object models in a way so that they are strategic and focused
* Creates clear separation between areas (Bounded context)
* Encourages clear and common understanding among stakeholders.

> The approach is derived from **object oriented design**, which is understood by people in technology, is **proven to meet business needs** and can be **easily grasped**  when presented in the form of a domain model.

Goal definition:

- DDD is there to simplify domain complexities through a **ubiquitous language**, define system boundaries that focus on a specific business problems and keep a focus on the business logic residing in the core domain.

Achieving this goal will lead to high quality software 

## Principles

- A domain model is the **idea** that a diagram is intended to convey, not the diagram itself.
- It's not just the knowledge in a domain expert's head. It's the rigorously organized and selective abstraction of that knowledge. A diagram can represent and communicate a model, as can carefully written code, as can an English sentence.
* A common problem in system design is that people often use different words for the same thing or the same words for different things - Unification of jargon lead to an Ubiquitous language.
* BBOM - Big Ball of Mud.  Big complex disorganized monolith system
* DDD -> Collaboration/Experimentation/Adaptation

## Modelling Paradigms

* Object Oriented Design (OOD)
	* open/closed principle: Open for extension but closed for modification. 
* Command Query Responsibility Segregation (CQRS)
	* Every method should be either a command that performs an action or a query that returns data but not both. i.e. asking a question should not change the answer. (returning values should not have side effects)

## 1. Strategic Design
Get the big picture. The scope of the project

The onion architecture layers:
- user interface
- application services
- domain services
- domain model

- Typically one onion architecture per bounded context
- Dependency flows inward i.e. the outer layers depend on the inner ones.
- Infrastructure is outside this model
* Domain Model contains core obects and business rules
* Domain services trigger business logic
* Application services - ports, adapters, interfaces with ORM, search engines, messaging interfaces
* User Interface surfaces the functionality the user.

### 1.1 Event Storming

* Brings together domain experts and tech people in a workshop of collaborative discussion
* Ask for definitions of the important words and understand how they are a part of the business process
* Complexities will come out of conversations

### 1.2 Context Maps
- Maps the system areas and relationships between them
- Each context has it's own language but can have shared or be coupled with other contexts.
- Boundaries are created between contexts to create focus on specific areas 
- A bounded context (solution space) is not same as sub-domain (problem space)
- 


## 2. Tactical Design
get the detail

