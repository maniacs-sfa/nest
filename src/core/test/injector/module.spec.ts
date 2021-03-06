import { expect } from 'chai';
import * as sinon from 'sinon';
import { Module as ModuleDecorator } from '../../../common/utils/module.decorator';
import { UnkownExportException } from '../../../errors/exceptions/unkown-export.exception';
import { Module } from '../../injector/module';
import { Component } from '../../../common/utils/component.decorator';

describe('Module', () => {
    let module: Module;

    @ModuleDecorator({}) class TestModule {}
    @Component() class TestComponent {}

    beforeEach(() => {
        module = new Module(TestModule);
    });

    it('should throw "UnkownExportException" when given exported component is not a part of components array', () => {
        expect(
            () => module.addExportedComponent(TestComponent)
        ).throws(UnkownExportException);
    });

    it('should add route', () => {
        const collection = new Map();
        const setSpy = sinon.spy(collection, 'set');
        (<any>module)['_routes'] = collection;

        class Test {}
        module.addRoute(Test);
        expect(setSpy.getCall(0).args).to.deep.equal([ 'Test', {
            metatype: Test,
            instance: null,
            isResolved: false,
        }]);
    });

    it('should add component', () => {
        const collection = new Map();
        const setSpy = sinon.spy(collection, 'set');
        (<any>module)['_components'] = collection;

        module.addComponent(TestComponent);
        expect(setSpy.getCall(0).args).to.deep.equal([ 'TestComponent', {
            metatype: TestComponent,
            instance: null,
            isResolved: false,
        }]);
    });


});