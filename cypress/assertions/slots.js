export const assertSlots = (slotsResponseBody, specialtyResponseBody, user) => {
    expect(slotsResponseBody).to.have.lengthOf.at.least(1).and.lengthOf.at.most(100)

    slotsResponseBody.forEach((appointment) => {
        expect(appointment.status, 'Appointment status').to.equal('AVAILABLE');
        expect(appointment.doctorSpecialties).to.deep.equal([specialtyResponseBody.name])
        expect(appointment.doctorFullName).to.eq(`${user.firstName} ${user.lastName}`)
    });
}